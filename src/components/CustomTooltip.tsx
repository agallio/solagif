import React from 'react'
import * as Tooltip from '@radix-ui/react-tooltip'

interface CustomTooltipProps {
  trigger: React.ReactNode | null
  content: React.ReactNode
}

export default function CustomTooltip({
  trigger,
  content,
}: CustomTooltipProps) {
  return (
    <Tooltip.Root delayDuration={0}>
      <Tooltip.Trigger>{trigger}</Tooltip.Trigger>
      <Tooltip.Content>{content}</Tooltip.Content>
    </Tooltip.Root>
  )
}
