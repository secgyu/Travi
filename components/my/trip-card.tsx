"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShareModal } from "@/components/share-modal";
import { MapPin, Calendar, Clock, Edit, Trash2, Share2 } from "lucide-react";
import { useAsyncAction } from "@/hooks/use-async-action";

type Trip = {
  id: string;
  title: string;
  destination: string;
  dates: string;
  status: string;
  budget: string;
};

interface TripCardProps {
  trip: Trip;
  onDelete?: (id: string) => void;
}

const getStatusBadge = (status: string) => {
  const badges = {
    upcoming: <Badge className="bg-cta text-cta-foreground">예정</Badge>,
    ongoing: <Badge className="bg-green-600 text-white">진행중</Badge>,
    planning: <Badge variant="outline">계획중</Badge>,
    completed: <Badge variant="secondary">완료</Badge>,
  };
  return badges[status as keyof typeof badges] || <Badge variant="outline">계획중</Badge>;
};

export function TripCard({ trip, onDelete }: TripCardProps) {
  const router = useRouter();
  const [isShareOpen, setIsShareOpen] = useState(false);

  const handleEdit = () => {
    router.push(`/results?id=${trip.id}&edit=true`);
  };

  const { execute: deleteTrip, isLoading: isDeleting } = useAsyncAction(
    async () => {
      const response = await fetch(`/api/travel-plans/${trip.id}`, { method: "DELETE" });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "삭제에 실패했습니다");
      }
      return response.json();
    },
    {
      successMessage: "여행이 삭제되었습니다",
      onSuccess: () => {
        onDelete?.(trip.id);
        router.refresh();
      },
    }
  );

  const handleDelete = () => {
    if (!confirm(`"${trip.title}" 여행을 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.`)) return;
    deleteTrip();
  };

  return (
    <>
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="mb-2">{trip.title}</CardTitle>
              <CardDescription className="flex flex-col gap-1">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {trip.destination}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {trip.dates}
                </span>
              </CardDescription>
            </div>
            {getStatusBadge(trip.status)}
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">예산</span>
            <span className="font-semibold text-foreground">{trip.budget}</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 gap-1 bg-transparent" asChild>
              <Link href={`/results?id=${trip.id}`}>
                <Clock className="h-3 w-3" />
                상세보기
              </Link>
            </Button>
            <Button variant="outline" size="sm" className="gap-1 bg-transparent" onClick={() => setIsShareOpen(true)}>
              <Share2 className="h-3 w-3" />
              공유
            </Button>
            <Button variant="outline" size="sm" className="gap-1 bg-transparent" onClick={handleEdit}>
              <Edit className="h-3 w-3" />
              편집
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1 text-destructive hover:text-destructive bg-transparent"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <ShareModal open={isShareOpen} onOpenChange={setIsShareOpen} planId={trip.id} />
    </>
  );
}
