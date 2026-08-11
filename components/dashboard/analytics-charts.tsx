'use client'

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
} from 'recharts'
import { Card } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'

const viewsConfig = {
  views: { label: 'Vues', color: 'var(--chart-1)' },
} satisfies ChartConfig

const scoreConfig = {
  score: { label: 'Viral Score', color: 'var(--chart-2)' },
} satisfies ChartConfig

export function ViewsChart({
  data,
}: {
  data: { day: string; views: number }[]
}) {
  return (
    <Card className="border-border bg-card p-5">
      <h3 className="font-heading text-base font-semibold">
        Vues sur 7 jours
      </h3>
      <ChartContainer config={viewsConfig} className="mt-4 h-56 w-full">
        <AreaChart data={data} margin={{ left: 8, right: 8 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area
            dataKey="views"
            type="monotone"
            fill="var(--color-views)"
            fillOpacity={0.2}
            stroke="var(--color-views)"
            strokeWidth={2}
          />
        </AreaChart>
      </ChartContainer>
    </Card>
  )
}

export function ScoreChart({
  data,
}: {
  data: { title: string; score: number }[]
}) {
  return (
    <Card className="border-border bg-card p-5">
      <h3 className="font-heading text-base font-semibold">
        Viral Score par vidéo
      </h3>
      <ChartContainer config={scoreConfig} className="mt-4 h-56 w-full">
        <BarChart data={data} margin={{ left: 8, right: 8 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="title"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(v: string) => v.slice(0, 8)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="score" fill="var(--color-score)" radius={6} />
        </BarChart>
      </ChartContainer>
    </Card>
  )
}
