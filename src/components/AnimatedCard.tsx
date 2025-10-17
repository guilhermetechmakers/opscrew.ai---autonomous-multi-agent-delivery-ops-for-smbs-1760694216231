import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  description?: string;
  delay?: number;
}

export function AnimatedCard({ 
  children, 
  className, 
  title, 
  description, 
  delay = 0 
}: AnimatedCardProps) {
  return (
    <Card 
      className={cn(
        "card-hover animate-fade-in-up",
        className
      )}
      style={{ animationDelay: `${delay * 100}ms` }}
    >
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}