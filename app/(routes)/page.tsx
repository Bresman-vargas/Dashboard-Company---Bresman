import SummaryCart from "./component/SummaryCart"
import { LastCustomers } from "./component/LastCustomers";
import {SalesDistributor} from "./component/SalesDistributor"
import {TotalSuscribers} from "./component/TotalSuscribers"
import {ListIntegrations } from "./component/ListIntegrations"
import { UsersRound, Waypoints, BookOpenCheck } from "lucide-react";


const dataCartsSummary = [
  {
    icon: UsersRound,
    total: "12.450",
    average : 15,
    title : "Companies created",
    tooltipText : "See all of the companies created"
  },
  {
    icon: Waypoints,
    total: "12.450",
    average : 45,
    title : "Total Revenue",
    tooltipText : "See all of the summary"
  },
  {
    icon: BookOpenCheck,
    total: "363.95",
    average : 80,
    title : "Bounce Rate",
    tooltipText : "See all of the bounce rate"
  },
] 

export default function Home() {
  return (
    <div>
      <main>
        <h3 className="text-xl font-semibold pb-4">Dashboard</h3>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dataCartsSummary.map(({icon, total, average, title, tooltipText}) => (
              <SummaryCart 
                key={title}
                icon = {icon}
                total= {total}
                average={average} 
                title={title}
                tooltipText={tooltipText}/>
          ))}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 mt-4 gap-4">
          <LastCustomers/>
          <SalesDistributor/>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 mt-4 gap-y-4 lg:gap-x-4">
          <TotalSuscribers/>
          <div className="col-span-2">
            <ListIntegrations/>
          </div>
        </section>
      </main>
    </div>
  );
}
