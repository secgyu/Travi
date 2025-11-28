"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, DollarSign, TrendingUp, Save, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

interface BudgetItem {
  id: string;
  category: string;
  amount: number;
  icon: React.ReactNode;
  color: string;
}

type Currency = "KRW" | "USD" | "EUR" | "JPY" | "CNY";

interface ExchangeRates {
  USD: number;
  EUR: number;
  JPY: number;
  CNY: number;
}

const CURRENCY_INFO = {
  KRW: { symbol: "₩", name: "원", format: (n: number) => `₩${n.toLocaleString()}` },
  USD: { symbol: "$", name: "달러", format: (n: number) => `$${n.toFixed(2)}` },
  EUR: { symbol: "€", name: "유로", format: (n: number) => `€${n.toFixed(2)}` },
  JPY: { symbol: "¥", name: "엔", format: (n: number) => `¥${Math.round(n).toLocaleString()}` },
  CNY: { symbol: "¥", name: "위안", format: (n: number) => `¥${n.toFixed(2)}` },
};

export default function BudgetPage() {
  const { data: session } = useSession();

  const [totalBudget, setTotalBudget] = useState(0);
  const [currency, setCurrency] = useState<Currency>("KRW");
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({
    USD: 0.00069,
    EUR: 0.00063,
    JPY: 0.0067,
    CNY: 0.0053,
  });
  const [isLoadingRate, setIsLoadingRate] = useState(true);
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    async function fetchBudget() {
      if (!session?.user) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/budget");
        const data = await response.json();

        if (data.success && data.data) {
          setTotalBudget(data.data.totalBudget || 0);
          setCurrency(data.data.currency || "KRW");
          setBudgetItems(
            (data.data.items || []).map((item: { id: string; category: string; amount: number; color: string }) => ({
              ...item,
              icon: <DollarSign className="h-4 w-4" />,
            }))
          );
        }
      } catch {
      } finally {
        setIsLoading(false);
      }
    }

    fetchBudget();
  }, [session]);

  useEffect(() => {
    async function fetchExchangeRate() {
      try {
        setIsLoadingRate(true);
        const response = await fetch("/api/exchange-rate");
        const data = await response.json();

        if (data.success && data.rates) {
          setExchangeRates({
            USD: data.rates.USD,
            EUR: data.rates.EUR,
            JPY: data.rates.JPY,
            CNY: data.rates.CNY,
          });
        }
      } catch {
      } finally {
        setIsLoadingRate(false);
      }
    }

    fetchExchangeRate();
  }, []);

  const handleSave = async () => {
    if (!session?.user) {
      toast.error("로그인 필요", { description: "예산을 저장하려면 로그인이 필요합니다." });
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch("/api/budget", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          totalBudget,
          currency,
          items: budgetItems,
        }),
      });

      if (!response.ok) throw new Error("저장 실패");

      toast.success("저장 완료", { description: "예산이 저장되었습니다." });
      setHasChanges(false);
    } catch {
      toast.error("저장 실패", { description: "다시 시도해주세요." });
    } finally {
      setIsSaving(false);
    }
  };

  const usedBudget = budgetItems.reduce((sum, item) => sum + item.amount, 0);
  const remainingBudget = totalBudget - usedBudget;
  const budgetPercentage = totalBudget > 0 ? (usedBudget / totalBudget) * 100 : 0;

  const handleAddItem = () => {
    if (!newCategory || !newAmount) return;

    const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500", "bg-pink-500", "bg-teal-500"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newItem: BudgetItem = {
      id: Date.now().toString(),
      category: newCategory,
      amount: Number.parseInt(newAmount),
      icon: <DollarSign className="h-4 w-4" />,
      color: randomColor,
    };

    setBudgetItems([...budgetItems, newItem]);
    setNewCategory("");
    setNewAmount("");
    setHasChanges(true);
  };

  const handleRemoveItem = (id: string) => {
    setBudgetItems(budgetItems.filter((item) => item.id !== id));
    setHasChanges(true);
  };

  const handleUpdateAmount = (id: string, newAmount: number) => {
    setBudgetItems(budgetItems.map((item) => (item.id === id ? { ...item, amount: newAmount } : item)));
    setHasChanges(true);
  };

  const handleTotalBudgetChange = (value: number) => {
    setTotalBudget(value);
    setHasChanges(true);
  };

  const handleCurrencyChange = (value: Currency) => {
    setCurrency(value);
    setHasChanges(true);
  };

  const convertFromKRW = (amount: number, toCurrency: Currency): number => {
    if (toCurrency === "KRW") return amount;
    const rate = exchangeRates[toCurrency];
    return amount * rate;
  };

  const formatCurrency = (krwAmount: number) => {
    if (currency === "KRW") {
      return `₩${krwAmount.toLocaleString()}`;
    }
    const converted = convertFromKRW(krwAmount, currency);
    return CURRENCY_INFO[currency].format(converted);
  };

  const getExchangeRateDisplay = () => {
    if (currency === "KRW") return null;
    const rate = 1 / exchangeRates[currency];
    return `1 ${currency} = ₩${Math.round(rate).toLocaleString()}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-accent/20 via-background to-background">
        <Header />
        <main className="mx-auto max-w-5xl px-4 py-12">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent/20 via-background to-background">
      <Header />

      <main className="mx-auto max-w-5xl px-4 py-12">
        {!session?.user && (
          <div className="mb-6 rounded-lg bg-accent/30 p-4 text-center text-sm text-muted-foreground">
            로그인하면 예산 데이터를 저장할 수 있습니다.
          </div>
        )}

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>전체 예산</span>
              <div className="flex items-center gap-2">
                <Label className="text-sm font-normal">통화:</Label>
                <Select value={currency} onValueChange={handleCurrencyChange}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="KRW">🇰🇷 KRW (원)</SelectItem>
                    <SelectItem value="USD">🇺🇸 USD (달러)</SelectItem>
                    <SelectItem value="EUR">🇪🇺 EUR (유로)</SelectItem>
                    <SelectItem value="JPY">🇯🇵 JPY (엔)</SelectItem>
                    <SelectItem value="CNY">🇨🇳 CNY (위안)</SelectItem>
                  </SelectContent>
                </Select>
                {session?.user && (
                  <Button onClick={handleSave} disabled={isSaving || !hasChanges} size="sm" className="gap-2">
                    {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    저장
                  </Button>
                )}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="totalBudget">총 예산 금액 (KRW 기준)</Label>
              <Input
                id="totalBudget"
                type="number"
                value={totalBudget}
                onChange={(e) => handleTotalBudgetChange(Number.parseInt(e.target.value) || 0)}
                className="text-2xl font-bold"
              />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>
                  {currency !== "KRW" && `표시: ${formatCurrency(totalBudget)}`}
                  {isLoadingRate && " (환율 정보 로딩 중...)"}
                </span>
                {!isLoadingRate && getExchangeRateDisplay() && (
                  <span className="text-xs">{getExchangeRateDisplay()}</span>
                )}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg bg-primary/10 p-4">
                <div className="mb-1 text-sm text-muted-foreground">사용한 예산</div>
                <div className="text-2xl font-bold text-primary">{formatCurrency(usedBudget)}</div>
                {currency !== "KRW" && (
                  <div className="text-xs text-muted-foreground">₩{usedBudget.toLocaleString()}</div>
                )}
              </div>

              <div className="rounded-lg bg-secondary/20 p-4">
                <div className="mb-1 text-sm text-muted-foreground">남은 예산</div>
                <div className="text-2xl font-bold text-foreground">{formatCurrency(remainingBudget)}</div>
                {currency !== "KRW" && (
                  <div className="text-xs text-muted-foreground">₩{remainingBudget.toLocaleString()}</div>
                )}
              </div>

              <div className="rounded-lg bg-accent/20 p-4">
                <div className="mb-1 text-sm text-muted-foreground">사용률</div>
                <div className="text-2xl font-bold text-foreground">{budgetPercentage.toFixed(1)}%</div>
                <div className="text-xs text-muted-foreground">{remainingBudget >= 0 ? "예산 내" : "예산 초과"}</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-4 overflow-hidden rounded-full bg-muted">
                <div
                  className={`h-full transition-all ${remainingBudget >= 0 ? "bg-primary" : "bg-destructive"}`}
                  style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
                />
              </div>
              {remainingBudget < 0 && (
                <Badge variant="destructive" className="w-full justify-center">
                  예산을 {formatCurrency(Math.abs(remainingBudget))} 초과했습니다
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>예산 항목별 배분</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>카테고리</TableHead>
                  <TableHead>금액</TableHead>
                  <TableHead>비율</TableHead>
                  <TableHead className="text-right">작업</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {budgetItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className={`flex h-8 w-8 items-center justify-center rounded ${item.color} text-white`}>
                          {item.icon}
                        </div>
                        <span className="font-medium">{item.category}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Input
                          type="number"
                          value={item.amount}
                          onChange={(e) => handleUpdateAmount(item.id, Number.parseInt(e.target.value) || 0)}
                          className="w-32"
                        />
                        <div className="text-xs text-muted-foreground">{formatCurrency(item.amount)}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                            <div
                              className={`h-full ${item.color}`}
                              style={{ width: `${totalBudget > 0 ? (item.amount / totalBudget) * 100 : 0}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">
                            {totalBudget > 0 ? ((item.amount / totalBudget) * 100).toFixed(1) : 0}%
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>새 항목 추가</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="newCategory">카테고리</Label>
                <Input
                  id="newCategory"
                  placeholder="예: 기념품"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="newAmount">금액</Label>
                <Input
                  id="newAmount"
                  type="number"
                  placeholder="50000"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                />
              </div>
              <div className="flex items-end">
                <Button onClick={handleAddItem} className="gap-2">
                  <Plus className="h-4 w-4" />
                  추가
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 rounded-lg bg-accent/20 p-6">
          <div className="mb-3 flex items-center gap-2 font-semibold text-foreground">
            <TrendingUp className="h-5 w-5 text-primary" />
            예산 관리 팁
          </div>
          <ul className="space-y-2 text-sm text-foreground/80">
            <li>• 총 예산의 10-15%는 예비비로 남겨두세요</li>
            <li>• 환율 변동을 고려하여 여유있게 계획하세요</li>
            <li>• 식비는 현지 물가를 미리 조사해보세요</li>
            <li>• 교통비는 교통카드 구매를 고려하면 절약할 수 있어요</li>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
}
