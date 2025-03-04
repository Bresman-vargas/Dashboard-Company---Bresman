import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Info } from 'lucide-react'

interface CustomTooltipProps {
    content : string;
}

export default function CustomTooltip(props: CustomTooltipProps ) {
    const {content} = props;
  return (
    <TooltipProvider>
    <Tooltip>
        <TooltipTrigger>
            <Info strokeWidth={2} className='size-4'/>
        </TooltipTrigger>
        <TooltipContent>
        <p>{content}</p>
        </TooltipContent>
    </Tooltip>
    </TooltipProvider>
  )
}
