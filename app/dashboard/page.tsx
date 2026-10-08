import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Activity } from "lucide-react";
import * as motion from "framer-motion/client";

export default function DashboardPage() {
  const kpis = [
    { title: "Total Leads", value: "4,827", change: "+12.4%", trend: "up" },
    { title: "Qualified Leads", value: "624", change: "+8.2%", trend: "up" },
    { title: "Hot Leads", value: "127", change: "+14.1%", trend: "up" },
    { title: "Meetings", value: "7", change: "+2", trend: "up" },
  ];

  const opportunities = [
    { company: "ABC SaaS", country: "USA", score: 96, intent: "High", service: "Website Redesign" },
    { company: "XYZ AI", country: "UK", score: 93, intent: "High", service: "AI Automation" },
    { company: "SolarTech", country: "UAE", score: 91, intent: "High", service: "Web App" },
  ];

  const activities = [
    { time: "2 min ago", text: "ABC SaaS qualified as HOT lead" },
    { time: "10 min ago", text: "Website audit completed for XYZ AI" },
    { time: "25 min ago", text: "New lead discovered: SolarTech" },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="p-8 space-y-8"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item}>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          What&apos;s happening with my client acquisition today?
        </p>
      </motion.div>

      <motion.div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" variants={container}>
        {kpis.map((kpi, i) => (
          <motion.div key={i} variants={item}>
            <Card className="hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {kpi.title}
                </CardTitle>
                <div className="p-2 bg-primary/5 rounded-full">
                  <Activity className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tracking-tight">{kpi.value}</div>
                <p className="text-xs font-medium mt-2 flex items-center text-emerald-500 bg-emerald-500/10 w-fit px-2 py-0.5 rounded-full">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  {kpi.change} from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7" variants={container}>
        <motion.div className="col-span-4" variants={item}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Top Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {opportunities.map((opp, i) => (
                  <div key={i} className="group flex items-center justify-between p-4 border rounded-xl bg-card hover:bg-muted/50 cursor-pointer transition-all hover:border-primary/30">
                    <div>
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{opp.company}</h3>
                      <p className="text-sm text-muted-foreground flex gap-2 mt-1">
                        <span>{opp.country}</span>
                        <span className="text-muted-foreground/40">•</span>
                        <span>{opp.service}</span>
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant="destructive" className="bg-orange-500/10 text-orange-600 group-hover:bg-orange-500/20 border-0 transition-colors shadow-none">
                        {opp.score}/100 HOT
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div className="col-span-3" variants={item}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                {activities.map((activity, i) => (
                  <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-background bg-muted/50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border bg-card hover:bg-muted/50 transition-colors">
                      <p className="text-sm font-medium">{activity.text}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
