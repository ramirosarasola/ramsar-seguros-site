'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'

export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger>¿Qué cubre un seguro de auto básico?</AccordionTrigger>
        <AccordionContent>
          El plan básico cubre responsabilidad civil frente a terceros, daños a personas y
          propiedades ajenas en caso de accidente. No incluye daños propios al vehículo.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>¿Cuánto demora cotizar?</AccordionTrigger>
        <AccordionContent>
          En menos de 2 minutos obtenés comparativas de las 14 mejores aseguradoras de
          Argentina. Sin llamados, sin formularios interminables.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>¿Puedo contratar 100% digital?</AccordionTrigger>
        <AccordionContent>
          Sí. Todo el proceso, desde la cotización hasta la firma del contrato, es 100% digital
          con firma electrónica válida legalmente en Argentina.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export function TooltipDemo() {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Top (default)</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Cotizá en 2 minutos sin llamados</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Bottom</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Aparece debajo del trigger</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Left</Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Aparece a la izquierda</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Right</Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Aparece a la derecha</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
