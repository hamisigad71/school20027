import React, { useState } from "react";
import { PageHeader } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Filter, HeartPulse, Activity, AlertCircle, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const mockRecords = [
  { id: "MED-001", student: "Daniel Komen", form: "Form 3", bloodGroup: "O+", allergies: "None", conditions: "Asthma", lastVisit: "Oct 12, 2026", status: "Active" },
  { id: "MED-002", student: "Grace Mbugua", form: "Form 1", bloodGroup: "A-", allergies: "Penicillin, Peanuts", conditions: "None", lastVisit: "Sep 05, 2026", status: "Active" },
  { id: "MED-003", student: "Caleb Njuguna", form: "Form 2", bloodGroup: "B+", allergies: "None", conditions: "None", lastVisit: "Jan 10, 2026", status: "Active" },
];

export default function SanatoriumRecords() {
  const [q, setQ] = useState("");

  const filtered = mockRecords.filter(req => 
    req.student.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      <PageHeader 
        title="Student Medical Records" 
        subtitle="Manage student health profiles, conditions, and emergency contacts." 
        actions={
          <div className="flex gap-2">
            <Button className="h-9 gap-2 bg-indigo-600 hover:bg-indigo-700 text-xs font-bold">
              <Plus size={14}/> Create Profile
            </Button>
          </div>
        }
      />
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-2">
         {[
           { title: "Registered Profiles", val: "850", icon: HeartPulse, color: "text-slate-500" },
           { title: "Chronic Conditions", val: "42", icon: Activity, color: "text-amber-500" },
           { title: "Severe Allergies", val: "18", icon: AlertCircle, color: "text-rose-500" }
         ].map((stat, i) => (
            <Card key={i} className="shadow-sm border-slate-200/80">
               <CardContent className="p-5 flex items-center justify-between">
                  <div>
                     <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{stat.title}</p>
                     <p className="text-2xl font-bold text-slate-900 mt-1">{stat.val}</p>
                  </div>
                  <div className={cn("h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center", stat.color)}>
                     <stat.icon size={18} />
                  </div>
               </CardContent>
            </Card>
         ))}
      </div>

      <Card className="shadow-sm border-slate-200/80">
        <CardHeader className="p-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-6 pt-5 pb-4">
             <div>
              <CardTitle className="text-base font-bold text-slate-900 leading-none">Health Directory</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input 
                  placeholder="Search student..." 
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  className="pl-9 h-9 w-[260px] text-xs bg-slate-50 border-slate-200 focus-visible:ring-indigo-500/20"
                />
              </div>
              <Button variant="outline" className="h-9 w-9 p-0 bg-slate-50 text-slate-500 border-slate-200 shrink-0">
                <Filter size={14}/>
              </Button>
            </div>
          </div>
          <Separator className="bg-slate-50" />
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b border-slate-50">
                <TableHead className="pl-6 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Student</TableHead>
                <TableHead className="py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-center">Vitals Group</TableHead>
                <TableHead className="py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Allergies / Conditions</TableHead>
                <TableHead className="py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Last Clinic Visit</TableHead>
                <TableHead className="pr-6 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((item) => (
                <TableRow key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                   <TableCell className="pl-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-700">{item.student}</span>
                      <span className="text-[10px] text-slate-500 font-mono mt-0.5">{item.id} • {item.form}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 text-center">
                    <span className="text-xs font-bold font-mono px-2 py-1 bg-slate-100 text-slate-700 rounded rounded-lg">{item.bloodGroup}</span>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex flex-col gap-1.5">
                       {item.allergies !== "None" ? (
                         <div className="text-[10px] font-medium text-rose-700 flex items-center gap-1"><AlertCircle size={10}/> {item.allergies}</div>
                       ) : <span className="text-[10px] text-slate-400">No known allergies</span>}
                       
                       {item.conditions !== "None" ? (
                         <div className="text-[10px] font-medium text-amber-700 flex items-center gap-1"><Activity size={10}/> {item.conditions}</div>
                       ) : null}
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                     <span className="text-[11px] font-medium text-slate-600">{item.lastVisit}</span>
                  </TableCell>
                  <TableCell className="pr-6 py-4 text-right">
                    <Button variant="ghost" size="sm" className="h-8 gap-2 bg-white border border-slate-200 text-xs text-slate-600 font-bold hover:text-indigo-600 hover:border-indigo-200 shadow-sm">
                      <FileText size={14}/> View Folio
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
