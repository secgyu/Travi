"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, Train, Utensils, Camera, Navigation, Edit, Trash2, GripVertical } from "lucide-react";
import type { Activity } from "@/types/results";

interface ActivityCardProps {
  activity: Activity;
  idx: number;
  isEditMode: boolean;
  isEditing: boolean;
  isSelected: boolean;
  isFirst: boolean;
  isLast: boolean;
  activeDay: number;
  onActivityClick: (idx: number) => void;
  onMoveActivity: (dayNum: number, idx: number, direction: "up" | "down") => void;
  onDeleteActivity: (dayNum: number, idx: number) => void;
  onUpdateActivity: (dayNum: number, idx: number, field: keyof Activity, value: string | boolean) => void;
  onToggleEdit: (idx: number | null) => void;
}

export function ActivityCard({
  activity,
  idx,
  isEditMode,
  isEditing,
  isSelected,
  isFirst,
  isLast,
  activeDay,
  onActivityClick,
  onMoveActivity,
  onDeleteActivity,
  onUpdateActivity,
  onToggleEdit,
}: ActivityCardProps) {
  return (
    <Card
      onClick={() => onActivityClick(idx)}
      className={`overflow-hidden shadow-md transition-all hover:shadow-xl cursor-pointer ${
        isEditMode
          ? "border-2 border-dashed border-primary"
          : isSelected
          ? "ring-2 ring-primary border-primary bg-primary/5"
          : "border-0"
      }`}
    >
      <div className="p-4 md:p-5">
        {isEditMode && (
          <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                disabled={isFirst}
                onClick={(e) => {
                  e.stopPropagation();
                  onMoveActivity(activeDay, idx, "up");
                }}
              >
                ↑
              </Button>
              <Button
                variant="ghost"
                size="sm"
                disabled={isLast}
                onClick={(e) => {
                  e.stopPropagation();
                  onMoveActivity(activeDay, idx, "down");
                }}
              >
                ↓
              </Button>
              <GripVertical className="h-4 w-4 text-muted-foreground" />
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-primary"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleEdit(isEditing ? null : idx);
                }}
              >
                <Edit className="h-4 w-4" />
                {isEditing ? "완료" : "수정"}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteActivity(activeDay, idx);
                }}
              >
                <Trash2 className="h-4 w-4" />
                삭제
              </Button>
            </div>
          </div>
        )}

        {isEditMode && isEditing ? (
          <div className="space-y-4" onClick={(e) => e.stopPropagation()}>
            <div>
              <Label>시간</Label>
              <Input
                value={activity.time}
                onChange={(e) => onUpdateActivity(activeDay, idx, "time", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>장소명</Label>
              <Input
                value={activity.title}
                onChange={(e) => onUpdateActivity(activeDay, idx, "title", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>현지명</Label>
              <Input
                value={activity.subtitle}
                onChange={(e) => onUpdateActivity(activeDay, idx, "subtitle", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>이동 방법</Label>
              <Input
                value={activity.transport}
                onChange={(e) => onUpdateActivity(activeDay, idx, "transport", e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>소요 시간</Label>
                <Input
                  value={activity.duration}
                  onChange={(e) => onUpdateActivity(activeDay, idx, "duration", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>예상 비용</Label>
                <Input
                  value={activity.price}
                  onChange={(e) => onUpdateActivity(activeDay, idx, "price", e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-3 flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="font-semibold text-primary">{activity.time}</span>
              </div>
              <Badge variant="secondary" className="rounded-lg text-xs md:text-sm">
                {activity.type}
              </Badge>
            </div>

            <h3 className="mb-1 text-lg font-bold text-foreground md:text-xl">{activity.title}</h3>
            <p className="mb-3 text-sm text-muted-foreground md:text-base">{activity.subtitle}</p>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Train className="h-4 w-4 text-secondary" />
                <span>{activity.transport}</span>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Navigation className="h-4 w-4" />
                  {activity.duration}
                </div>
                <div className="flex items-center gap-2 font-medium text-forest">{activity.price}</div>
              </div>

              {activity.category && (
                <div className="flex items-center gap-2 text-sm">
                  <Utensils className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{activity.category}</span>
                </div>
              )}

              {activity.photo && (
                <div className="mt-3 flex items-center gap-2 rounded-lg bg-cta/10 px-3 py-2">
                  <Camera className="h-4 w-4 text-cta-foreground" />
                  <span className="text-sm font-medium text-cta-foreground">포토존 추천</span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Card>
  );
}
