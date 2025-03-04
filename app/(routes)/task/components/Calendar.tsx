'use client';
import {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation'

import multiMonthPlugin from '@fullcalendar/multimonth'
import FullCalendar  from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import { DateSelectArg, EventContentArg, EventClickArg  } from '@fullcalendar/core/index.js'

import axios from 'axios' 
import { formatDate} from '@/lib/formatDate'
import { toast } from 'sonner'

import {Company, Event} from '@prisma/client'
import { ModalAddEvent } from './ModalAddEvent'
interface CalendarPros {
    companies: Company[];
    events: Event[];
}

export function Calendar(props: CalendarPros) {
    const {companies, events} = props
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [onSaveNewEvent, setOnSaveNewEvent] = useState(false)
    const [selectedItem, setSelectedItem] = useState<DateSelectArg>()
    const [newEvent, setNewEvent] = useState({
        eventName:"",
        companySelected: {
            name: "",
            id:""
        }
    })
    const handleDateClick = async (selected: DateSelectArg) => {
        setOpen(true)
        setSelectedItem(selected)
    }

    useEffect(() => {
        if(onSaveNewEvent && selectedItem?.view.calendar){
            const calendarApi = selectedItem.view.calendar
            calendarApi.unselect()

            const newEventPrisma = {
                companyId : newEvent.companySelected.id,
                title : newEvent.eventName,
                start: new Date(selectedItem.start),
                allDay: false,
                timeFormat: 'H(:am)'
            }

            axios.post(`/api/company/${newEvent.companySelected.id}/event`, newEventPrisma)
            .then(() => {
                toast.success("Event create!!")
                router.refresh()
            })
            .catch(error => {
                toast.error("Problem!!")
            })
            .finally(() => {
                setNewEvent({ eventName: "", companySelected: { name: "", id: "" } });
                setOnSaveNewEvent(false);
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onSaveNewEvent, selectedItem, events])
    
    const handleEventClick = async (selected: EventClickArg) => {
        if(window.confirm(
            `Are you sure you want to eliminate this event ${selected.event.title}`
        )){
            try {
                // Extract both IDs needed for the API route
                const eventId = selected.event.id;
                
                // Check how companyId is stored in your event object
                // It might be in extendedProps or directly on the event
                const companyId = selected.event.extendedProps?.companyId;
                
                if (!companyId) {
                    console.error("Company ID not found in event:", selected.event);
                    toast.error("Couldn't find company ID for this event");
                    return;
                }
                
                // Use the correct path format matching your API route
                await axios.delete(`/api/company/${companyId}/event/${eventId}`);
                toast.success("Event delate!!")
                router.refresh()
            } catch (error) {
                toast.error("Problem!!")
            }
        }
    }
    return (
        <div>
            <div className='2xl:flex gap-x-3'>
                <div className='w-[200px] relative'>
                    <div className='absolute top-0 left-0 w-full h-full overflow-auto'>
                        <p className='mb-3 text-xl'>Listado de tareas</p>
                        {events.map((currentEvent) => (
                            <div key={currentEvent.id} className='p-4 mb-2 rounded-lg bg-card border border-border'>
                                <p className='font-bold'>{currentEvent.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='flex-1 calendar-container'>
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin, multiMonthPlugin]}
                        headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: "timeGridDay,timeGridWeek,dayGridMonth,multiMonthYear,listMonth"
                        }}
                        height="80vh"

                        initialView='dayGridMonth'
                        weekends={true}
                        firstDay={1}
                        events={events}
                        eventContent={renderEventContent}
                        eventClick={handleEventClick}
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        select={handleDateClick}
                        nowIndicator={true}
                    />
                </div>
            </div>
            <div>
                <ModalAddEvent
                    open={open}
                    setOpen={setOpen}
                    setOnSaveNewEvent={setOnSaveNewEvent}
                    companies={companies}
                    setNewEvent={setNewEvent}
                />
            </div>
        </div>
    )
}

function renderEventContent(eventInfo: EventContentArg) {
    return (
        <div>
            <b>{eventInfo.timeText}</b><br/>
            <i>{eventInfo.event.title}</i>
        </div>
    )
}