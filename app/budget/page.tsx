"use client";

import type React from "react";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2, Plane, Hotel, Utensils, Car, ShoppingBag, DollarSign, TrendingUp } from "lucide-react";

interface BudgetItem {
  id: string;
  category: string;
  amount: number;
  icon: React.ReactNode;
  color: string;
}

export default function BudgetPage() {
  const [totalBudget, setTotalBudget] = useState(500000);
  const [currency, setCurrency] = useState("KRW");
  const [exchangeRate] = useState(0.00075); // KRW to USD
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([
    { id: "1", category: "항공권", amount: 200000, icon: <Plane className="h-4 w-4" />, color: "bg-blue-500" },
    { id: "2", category: "숙박", amount: 150000, icon: <Hotel className="h-4 w-4" />, color: "bg-purple-500" },
    { id: "3", category: "식비", amount: 80000, icon: <Utensils className="h-4 w-4" />, color: "bg-orange-500" },
    { id: "4", category: "교통", amount: 40000, icon: <Car className="h-4 w-4" />, color: "bg-green-500" },
    { id: "5", category: "쇼핑", amount: 30000, icon: <ShoppingBag className="h-4 w-4" />, color: "bg-pink-500" },
  ]);
  const [newCategory, setNewCategory] = useState("");
  const [newAmount, setNewAmount] = useState("");

  const usedBudget = budgetItems.reduce((sum, item) => sum + item.amount, 0);
  const remainingBudget = totalBudget - usedBudget;
  const budgetPercentage = (usedBudget / totalBudget) * 100;

  const handleAddItem = () => {
    if (!newCategory || !newAmount) return;

    const newItem: BudgetItem = {
      id: Date.now().toString(),
      category: newCategory,
      amount: Number.parseInt(newAmount),
      icon: <DollarSign className="h-4 w-4" />,
      color: "bg-gray-500",
    };

    setBudgetItems([...budgetItems, newItem]);
    setNewCategory("");
    setNewAmount("");
  };

  const handleRemoveItem = (id: string) => {
    setBudgetItems(budgetItems.filter((item) => item.id !== id));
  };

  const handleUpdateAmount = (id: string, newAmount: number) => {
    setBudgetItems(budgetItems.map((item) => (item.id === id ? { ...item, amount: newAmount } : item)));
  };

  const formatCurrency = (amount: number) => {
    if (currency === "KRW") {
      return `₩${amount.toLocaleString()}원`;
    }
    return `$${(amount * exchangeRate).toFixed(2)}`;
  };

  const convertCurrency = (amount: number) => {
    if (currency === "KRW") {
      return `$${(amount * exchangeRate).toFixed(2)}`;
    }
    return `₩${Math.round(amount / exchangeRate).toLocaleString()}원`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent/20 via-background to-background">
      <Header />
      <PageHeader title="예산 계산기" />

      <main className="mx-auto max-w-5xl px-4 py-12">
        {/* Budget Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>전체 예산</span>
              <Button variant="outline" size="sm" onClick={() => setCurrency(currency === "KRW" ? "USD" : "KRW")}>
                {currency === "KRW" ? "KRW → USD" : "USD → KRW"}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="totalBudget">총 예산 금액</Label>
              <Input
                id="totalBudget"
                type="number"
                value={totalBudget}
                onChange={(e) => setTotalBudget(Number.parseInt(e.target.value) || 0)}
                className="text-2xl font-bold"
              />
              <p className="text-sm text-muted-foreground">환율: {convertCurrency(totalBudget)}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg bg-primary/10 p-4">
                <div className="mb-1 text-sm text-muted-foreground">사용한 예산</div>
                <div className="text-2xl font-bold text-primary">{formatCurrency(usedBudget)}</div>
                <div className="text-xs text-muted-foreground">{convertCurrency(usedBudget)}</div>
              </div>

              <div className="rounded-lg bg-secondary/20 p-4">
                <div className="mb-1 text-sm text-muted-foreground">남은 예산</div>
                <div className="text-2xl font-bold text-foreground">{formatCurrency(remainingBudget)}</div>
                <div className="text-xs text-muted-foreground">{convertCurrency(remainingBudget)}</div>
              </div>

              <div className="rounded-lg bg-accent/20 p-4">
                <div className="mb-1 text-sm text-muted-foreground">사용률</div>
                <div className="text-2xl font-bold text-foreground">{budgetPercentage.toFixed(1)}%</div>
                <div className="text-xs text-muted-foreground">{remainingBudget >= 0 ? "예산 내" : "예산 초과"}</div>
              </div>
            </div>

            {/* Progress Bar */}
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

        {/* Budget Breakdown */}
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
                        <div className="text-xs text-muted-foreground">{convertCurrency(item.amount)}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                            <div
                              className={`h-full ${item.color}`}
                              style={{ width: `${(item.amount / totalBudget) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{((item.amount / totalBudget) * 100).toFixed(1)}%</span>
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

        {/* Add New Item */}
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

        {/* Tips */}
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
