import { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface Activity {
  time: string;
  title: string;
  subtitle: string;
  type: string;
  transport: string;
  duration: string;
  price: string;
  photo: boolean;
}

interface DayItinerary {
  day: number;
  title: string;
  date: string;
  activities: Activity[];
}

interface TravelPlan {
  title: string;
  destination: string;
  start_date: string;
  end_date: string;
  budget: number;
}

interface UsePdfDownloadProps {
  travelPlan: TravelPlan | null;
  itinerary: DayItinerary[];
  formatDate: (dateStr: string) => string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  onStart?: () => void;
}

export function usePdfDownload({
  travelPlan,
  itinerary,
  formatDate,
  onSuccess,
  onError,
  onStart,
}: UsePdfDownloadProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadPDF = async () => {
    if (!travelPlan) return;

    try {
      setIsDownloading(true);
      onStart?.();

      const iframe = document.createElement("iframe");
      iframe.style.cssText = "position: absolute; left: -9999px; top: 0; width: 850px; height: 1px;";
      document.body.appendChild(iframe);

      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!iframeDoc) {
        throw new Error("iframe 생성 실패");
      }

      iframeDoc.open();
      iframeDoc.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              background: #ffffff;
              color: #000000;
              padding: 40px;
            }
          </style>
        </head>
        <body>
      `);

      const pdfContainer = iframeDoc.body;

      let html = `
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="font-size: 28px; color: #16a34a; margin-bottom: 10px;">🌍 ${travelPlan.title}</h1>
          <p style="font-size: 14px; color: #666;">
            📅 ${formatDate(travelPlan.start_date)} ~ ${formatDate(travelPlan.end_date)}
          </p>
          <p style="font-size: 14px; color: #666;">
            📍 ${travelPlan.destination} | 💰 예산: ₩${travelPlan.budget?.toLocaleString() || 0}원
          </p>
        </div>
        <hr style="border: none; border-top: 2px solid #e5e7eb; margin: 20px 0;" />
      `;

      for (const day of itinerary) {
        html += `
          <div style="margin-bottom: 30px;">
            <h2 style="font-size: 20px; color: #16a34a; margin-bottom: 15px; padding: 10px; background: #f0fdf4; border-radius: 8px;">
              📆 ${day.title} - ${day.date}
            </h2>
        `;

        for (const activity of day.activities) {
          html += `
            <div style="margin-bottom: 15px; padding: 15px; border: 1px solid #e5e7eb; border-radius: 8px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span style="font-weight: bold; color: #16a34a;">🕐 ${activity.time}</span>
                <span style="background: #f3f4f6; padding: 2px 8px; border-radius: 4px; font-size: 12px;">${activity.type}</span>
              </div>
              <h3 style="font-size: 16px; font-weight: bold; margin-bottom: 5px;">${activity.title}</h3>
              ${activity.subtitle ? `<p style="font-size: 14px; color: #666; margin-bottom: 8px;">${activity.subtitle}</p>` : ""}
              <div style="font-size: 13px; color: #666;">
                <p>🚇 이동: ${activity.transport}</p>
                <p>⏱️ 소요: ${activity.duration} | 💵 비용: ${activity.price}</p>
                ${activity.photo ? '<p style="color: #f59e0b;">📸 포토존 추천</p>' : ""}
              </div>
            </div>
          `;
        }

        html += `</div>`;
      }

      html += `
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb;">
          <p style="font-size: 12px; color: #999;">Travi - AI 여행 플래너로 생성됨</p>
        </div>
      `;

      pdfContainer.innerHTML = html;
      iframeDoc.write("</body></html>");
      iframeDoc.close();

      await new Promise((resolve) => setTimeout(resolve, 100));

      const canvas = await html2canvas(iframeDoc.body, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
        allowTaint: true,
        windowWidth: 850,
      });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pdf = new jsPDF("p", "mm", "a4");

      const pageHeight = 297;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const fileName = `${travelPlan.title.replace(/\s/g, "_")}_여행계획.pdf`;
      pdf.save(fileName);
      document.body.removeChild(iframe);
      onSuccess?.();
    } catch (error) {
      onError?.(error as Error);
    } finally {
      setIsDownloading(false);
    }
  };
  return { isDownloading, downloadPDF };
}

