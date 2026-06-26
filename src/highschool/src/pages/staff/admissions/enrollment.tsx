import React, { useState } from "react";
import { PageHeader } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Filter, Users, UserPlus, CheckCircle, FileText, Download } from "lucide-react";
import { cn } from "@/lib/utils";

const mockEnrollments = [
  { id: "APP-2027-0105", name: "Sarah Wanjiku", form: "Form 1", prevSchool: "Spring Valley Primary", status: "Admitted", date: "Oct 26, 2026", score: "395" },
  { id: "APP-2027-0210", name: "David Ochieng", form: "Form 2", prevSchool: "Hillcrest Preparatory", status: "Under Review", date: "Oct 25, 2026", score: "380" },
  { id: "APP-2027-0215", name: "Grace Mutuku", form: "Form 1", prevSchool: "Moi Educational Centre", status: "Pending Docs", date: "Oct 24, 2026", score: "410" },
  { id: "APP-2027-0301", name: "Kevin Kiprop", form: "Form 3", prevSchool: "Alliance Academy", status: "Waitlisted", date: "Oct 23, 2026", score: "365" },
];

export default function AdmissionsEnrollment() {
  const [q, setQ] = useState("");

  const filtered = mockEnrollments.filter(req => 
    req.name.toLowerCase().includes(q.toLowerCase()) || 
    req.id.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      <PageHeader 
        title="Student Enrollment pipeline" 
        subtitle="Manage new admissions, application tracking, and onboarding." 
        actions={
          <div className="flex gap-2">
            <Button variant="outline" className="h-9 gap-2 text-xs font-bold text-slate-700">
              <Download size={14}/> Export CSV
            </Button>
            <Button className="h-9 gap-2 bg-indigo-600 hover:bg-indigo-700 text-xs font-bold">
              <UserPlus size={14}/> New Application
            </Button>
          </div>
        }
      />
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-2">
         {[
           { title: "Total Applications", val: "142", icon: Users, color: "text-indigo-500" },
           { title: "Under Review", val: "38", icon: FileText, color: "text-amber-500" },
           { title: "Pending Docs", val: "15", icon: Filter, color: "text-rose-500" },
           { title: "Admitted (Next Intake)", val: "89", icon: CheckCircle, color: "text-emerald-500" }
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
              <CardTitle className="text-base font-bold text-slate-900 leading-none">Application Tracking</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input 
                  placeholder="Search by name or APP ID..." 
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  className="pl-9 h-9 w-[260px] text-xs bg-slate-50 border-slate-200 focus-visible:ring-indigo-500/20"
                />
              </div>
            </div>
          </div>
          <Separator className="bg-slate-50" />
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b border-slate-50">
                <TableHead className="pl-6 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Applicant</TableHead>
                <TableHead className="py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Previous School</TableHead>
                <TableHead className="py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Target Form</TableHead>
                <TableHead className="py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Score</TableHead>
                <TableHead className="py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Status</TableHead>
                <TableHead className="pr-6 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((item) => (
                <TableRow key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                  <TableCell className="pl-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-700">{item.name}</span>
                      <span className="text-[10px] text-slate-500 font-mono mt-0.5">{item.id} • {item.date}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <span className="text-xs font-medium text-slate-600">{item.prevSchool}</span>
                  </TableCell>
                  <TableCell className="py-4">
                    <span className="text-xs font-medium text-slate-700">{item.form}</span>
                  </TableCell>
                  <TableCell className="py-4">
                    <span className="text-xs font-mono font-bold text-slate-600">{item.score} <span className="text-[10px] font-normal text-slate-400">MKs</span></span>
                  </TableCell>
                  <TableCell className="py-4">
                      <Badge variant="outline" className={cn(
                        "text-[9px] font-bold border-0 px-2 py-0.5",
                        item.status === "Admitted" ? "bg-emerald-50 text-emerald-700" :
                        item.status === "Under Review" ? "bg-blue-50 text-blue-700" :
                        item.status === "Waitlisted" ? "bg-slate-100 text-slate-700" :
                        "bg-amber-50 text-amber-700"
                      )}>
                        {item.status}
                      </Badge>
                  </TableCell>
                  <TableCell className="pr-6 py-4 text-right">
                    <Button variant="ghost" size="sm" className="h-8 gap-2 bg-white border border-slate-200 text-xs text-slate-600 font-bold hover:text-indigo-600 hover:border-indigo-200 shadow-sm">
                      <FileText size={14}/> Review File
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
