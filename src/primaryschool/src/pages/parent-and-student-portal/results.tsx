import { PageHeader } from "@/components/layout";
import { marksSeed, studentsSeed } from "@/primaryschool/src/data/mockData";

// shadcn/ui
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

// lucide
import { 
  Trophy, TrendingUp, TrendingDown, Download, 
  ArrowRight, Award,
  BookOpen, Lightbulb, Zap, Minus,
  Star, Target, Medal, CheckCircle2,
  Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function PortalResults() {
  const student = studentsSeed[0];
  const marks = marksSeed.filter((m) => m.studentId === student.id);
  const avg = marks.length ? Math.round(marks.reduce((t, m) => t + m.score, 0) / marks.length) : 0;

  // Grade Distribution Calculation (Grouped by base grade letter, e.g. A-, B+ -> A, B)
  const gradeDist = marks.reduce((acc: any, m) => {
    const baseGrade = m.grade.charAt(0).toUpperCase();
    acc[baseGrade] = (acc[baseGrade] || 0) + 1;
    return acc;
  }, {});

  const topSubject = [...marks].sort((a, b) => b.score - a.score)[0];
  const focusSubject = [...marks].sort((a, b) => a.score - b.score)[0];

  // Performance trend analysis

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Academic Performance" 
        subtitle="Comprehensive breakdown of your assessment metrics and teacher insights." 
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="hidden sm:flex bg-white border-slate-200 text-slate-700 shadow-sm gap-1.5 font-bold text-xs h-9 px-4">
              <Medal size={14} className="text-amber-500" /> View Certificates
            </Button>
            <Button size="sm" className="bg-indigo-600 hover:bg-black text-white shadow-lg shadow-indigo-100 gap-1.5 font-bold text-xs h-9 px-6 group">
              <Download size={14} className="group-hover:translate-y-0.5 transition-transform" /> Download Report
            </Button>
          </div>
        }
      />

      {/* ── Top Level Insights ────────────────────────────────────────── */}
      <div className="grid gap-3 sm:gap-4 lg:gap-6 lg:grid-cols-3">
        
        {/* Performance Overview */}
        <Card className="shadow-sm border-slate-200 bg-white group overflow-hidden">
          <CardContent className="p-0">
             <div className="p-4 sm:p-5 md:p-6">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 tracking-widest uppercase">Cumulative Average</p>
                  <TrendingUp size={14} className="sm:w-4 sm:h-4 text-emerald-500" />
                </div>
                <div className="flex items-baseline gap-2 sm:gap-3 mb-4 sm:mb-6">
                   <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">{avg}%</h3>
                   <span className="text-[8px] sm:text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">+3.2% vs Term 1</span>
                </div>
                <div className="space-y-3 sm:space-y-4">
                   <div>
                      <div className="flex justify-between items-center text-[10px] sm:text-[11px] font-bold mb-1.5 px-0.5">
                        <span className="text-slate-500 uppercase">Class Ranking</span>
                        <span className="text-indigo-600">8 / 38 Students</span>
                      </div>
                      <Progress value={avg} className="h-2 bg-slate-100 overflow-hidden shadow-inner">
                        <div className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all" style={{ width: `${avg}%` }} />
                      </Progress>
                   </div>
                   <p className="text-[9px] sm:text-[10px] font-semibold text-slate-500 leading-relaxed italic text-center py-2 px-3 sm:px-4 bg-slate-50 rounded-xl">
                    "You are currently performing in the top 15% of your class. Keep up the momentum!"
                   </p>
                </div>
             </div>
          </CardContent>
        </Card>

        {/* Grade Distribution Visualization */}
        <Card className="shadow-md border-slate-150 bg-white/95 rounded-3xl overflow-hidden group relative lg:col-span-2 transition-all duration-300 hover:shadow-lg">
          <CardHeader className="p-4 sm:p-5 md:p-6 pb-0">
            <div className="flex items-center justify-between flex-col sm:flex-row gap-2 sm:gap-0">
              <CardTitle className="text-xs sm:text-sm font-bold text-slate-900">Grade Distribution</CardTitle>
              <p className="text-[9px] sm:text-[10px] font-bold text-indigo-600 uppercase tracking-widest">{marks.length} Subjects Total</p>
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-5 md:p-6">
            <div className="relative h-36 sm:h-44 flex items-end justify-between gap-3 sm:gap-4 mb-4 mt-6 px-4">
              {/* Chart background grid lines */}
              <div className="absolute inset-x-0 inset-y-0 flex flex-col justify-between pointer-events-none opacity-40">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="w-full border-t border-dashed border-slate-100" />
                ))}
              </div>

              {["A", "B", "C", "D"].map((grade) => {
                const count = gradeDist[grade] || 0;
                const height = marks.length ? (count / marks.length) * 100 : 0;
                
                const gradients: Record<string, string> = {
                  A: "from-indigo-600 via-indigo-500 to-indigo-400 shadow-[0_4px_14px_rgba(79,70,229,0.25)]",
                  B: "from-blue-600 via-blue-500 to-sky-400 shadow-[0_4px_14px_rgba(37,99,235,0.25)]",
                  C: "from-amber-500 via-amber-500 to-yellow-400 shadow-[0_4px_14px_rgba(245,158,11,0.25)]",
                  D: "from-rose-500 via-rose-500 to-rose-400 shadow-[0_4px_14px_rgba(244,63,94,0.25)]",
                };
                const activeGradient = gradients[grade] || gradients.A;

                return (
                  <div key={grade} className="flex-1 flex flex-col items-center h-full gap-2 relative z-10 group cursor-pointer">
                    <div className="relative w-full flex-1 bg-slate-50/70 border border-slate-100/50 rounded-2xl overflow-hidden shadow-inner flex items-end">
                       <div 
                         className={cn(
                           "w-full rounded-b-2xl rounded-t-xl bg-gradient-to-t transition-all duration-1000 ease-out group-hover:scale-[1.02] group-hover:brightness-105",
                           activeGradient
                         )}
                         style={{ height: `${height || 3}%` }}
                       />
                       
                       <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
                         <span className="bg-slate-900/90 text-white text-[9px] sm:text-[10px] font-bold px-2 py-1 rounded-lg backdrop-blur-sm shadow-md">
                           {count} {count === 1 ? "subject" : "subjects"}
                         </span>
                       </div>
                    </div>
                    <div className="h-4 flex items-center justify-center">
                      {count > 0 ? (
                        <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                          {count}
                        </span>
                      ) : (
                        <span className="text-[10px] font-medium text-slate-300">0</span>
                      )}
                    </div>
                    <span className="text-[11px] sm:text-[12px] font-black text-slate-500 group-hover:text-indigo-600 transition-colors">{grade}</span>
                  </div>
                );
              })}
            </div>
            <Separator className="bg-slate-100/80 my-4" />
            <div className="flex items-center justify-between flex-col sm:flex-row gap-3">
               <div className="flex items-center -space-x-1.5">
                 {marks.slice(0, 4).map((m) => {
                   const char = m.subject.charAt(0);
                   const colors: Record<string, string> = {
                     M: "bg-indigo-50 text-indigo-600 border-indigo-200",
                     E: "bg-sky-50 text-sky-600 border-sky-200",
                     K: "bg-emerald-50 text-emerald-600 border-emerald-200",
                     S: "bg-amber-50 text-amber-600 border-amber-200",
                   };
                   const colorClass = colors[char] || "bg-purple-50 text-purple-600 border-purple-200";
                   return (
                     <div 
                       key={m.subject} 
                       title={m.subject}
                       className={cn("h-6.5 w-6.5 sm:h-7.5 sm:w-7.5 rounded-full border-2 border-white bg-white flex items-center justify-center text-[9px] sm:text-[10px] font-bold shadow-sm select-none", colorClass)}
                     >
                       {char}
                     </div>
                   );
                 })}
                 {marks.length > 4 && (
                   <div className="h-6.5 w-6.5 sm:h-7.5 sm:w-7.5 rounded-full border-2 border-white bg-indigo-600 flex items-center justify-center text-[9px] sm:text-[10px] font-bold text-white shadow-sm select-none">
                     +{marks.length - 4}
                   </div>
                 )}
               </div>
               <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-150 text-[10px] sm:text-[11px] font-bold text-slate-500 shadow-sm select-none">
                 <span className="text-amber-500 animate-pulse">⚡</span>
                 <span>Historical comparison available in Pro</span>
               </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Actionable Insights & Trends ───────────────────────────── */}
      <div className="grid gap-3 sm:gap-4 lg:gap-6 md:grid-cols-2">
        <Card className="border-indigo-100 bg-gradient-to-br from-white to-indigo-50/10 shadow-sm overflow-hidden group">
           <CardContent className="p-4 sm:p-5 md:p-6">
              <div className="flex gap-3 sm:gap-5">
                 <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-indigo-100 group-hover:scale-110 transition-transform">
                    <Zap size={20} className="sm:w-6 sm:h-6" />
                 </div>
                 <div>
                    <h4 className="text-xs sm:text-sm font-bold text-indigo-900 mb-1">Top Strength</h4>
                    <p className="text-[10px] sm:text-xs text-indigo-700/70 font-medium leading-relaxed mb-2 sm:mb-3">
                      You are naturally gifted in <span className="text-indigo-600 font-black tracking-tight">{topSubject.subject}</span>. Your {topSubject.score}% score is among the highest in the current grade.
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                       <span className="text-[8px] sm:text-[10px] font-black text-indigo-600 bg-indigo-100 px-2 sm:px-2.5 py-1 rounded-lg">98th Percentile</span>
                       <span className="text-[8px] sm:text-[10px] font-black text-indigo-400 flex items-center gap-1"><Medal size={10} /> Honor Roll</span>
                    </div>
                 </div>
              </div>
           </CardContent>
        </Card>

        <Card className="border-amber-100 bg-gradient-to-br from-white to-amber-50/10 shadow-sm overflow-hidden group">
           <CardContent className="p-4 sm:p-5 md:p-6">
              <div className="flex gap-3 sm:gap-5">
                 <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-amber-100 group-hover:scale-110 transition-transform">
                    <Target size={20} className="sm:w-6 sm:h-6" />
                 </div>
                 <div>
                    <h4 className="text-xs sm:text-sm font-bold text-amber-900 mb-1">Growth Area</h4>
                    <p className="text-[10px] sm:text-xs text-amber-700/70 font-medium leading-relaxed mb-2 sm:mb-3">
                      Focus more on <span className="text-amber-600 font-black tracking-tight">{focusSubject.subject}</span> this month. Consistent practice will help raise your {focusSubject.score}% to a B.
                    </p>\n                    <Button variant="ghost" className="h-7 text-[9px] sm:text-[10px] font-black text-amber-600 bg-amber-100/50 hover:bg-amber-100 px-2 sm:px-3 rounded-lg gap-1">
                      <Lightbulb size={10} /> Suggested Resources
                    </Button>
                 </div>
              </div>
           </CardContent>
        </Card>
      </div>

      {/* ── Subject Performance Table ───────────────────────────── */}
      <Card className="shadow-sm border-slate-200 overflow-hidden">
        <CardHeader className="px-6 py-5 border-b border-slate-100 bg-slate-50/40">
           <div className="flex items-center justify-between">
              <div>
                 <CardTitle className="text-base font-bold text-slate-900 tracking-tight">Subject Breakdown</CardTitle>
                 <CardDescription className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] mt-0.5">Term 2 • Formative Assessments</CardDescription>
              </div>
              <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 bg-white border border-slate-100 px-3 py-1.5 rounded-xl">
                 <Calendar size={12} /> May 2024
              </div>
           </div>
        </CardHeader>
        <CardContent className="p-0">
           <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-b border-slate-100 bg-slate-50/20">
                  <TableHead className="pl-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">Subject</TableHead>
                  <TableHead className="py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-center">Score</TableHead>
                  <TableHead className="py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-center">Class Avg</TableHead>
                  <TableHead className="py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-center">Grade</TableHead>
                  <TableHead className="py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-center">Trend</TableHead>
                  <TableHead className="pr-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-right">Insight</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {marks.map((m, i) => {
                  const classAvg = 70; // Simulated
                  const isAbove = m.score >= classAvg;
                  return (
                    <TableRow key={i} className="hover:bg-slate-50/50 border-b border-slate-100 transition-colors group">
                      <TableCell className="pl-6 py-4">
                         <div className="flex items-center gap-3">
                           <div className="h-8 w-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                             <BookOpen size={14} />
                           </div>
                           <div>
                              <p className="text-sm font-bold text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors">{m.subject}</p>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Unit Assessment</p>
                           </div>
                         </div>
                      </TableCell>
                      <TableCell className="py-4 text-center">
                         <div className="flex flex-col items-center">
                            <span className={cn("text-base font-black tracking-tight", isAbove ? "text-emerald-600" : "text-rose-600")}>{m.score}</span>
                            <span className="text-[8px] font-black text-slate-400 tracking-widest uppercase">/ 100</span>
                         </div>
                      </TableCell>
                      <TableCell className="py-4 text-center">
                         <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">{classAvg}%</span>
                      </TableCell>
                      <TableCell className="py-4 text-center">
                         <Badge variant="outline" className={cn(
                           "text-[10px] font-black px-3 py-1 ring-2 ring-white border shadow-sm",
                           m.score >= 80 ? "bg-indigo-600 text-white border-indigo-600" :
                           m.score >= 60 ? "bg-white text-indigo-700 border-indigo-100" :
                           "bg-white text-rose-600 border-rose-100"
                         )}>
                           {m.grade}
                         </Badge>
                      </TableCell>
                      <TableCell className="py-4 text-center">
                         <div className="flex items-center justify-center">
                            {m.score >= 75 ? (
                               <div className="h-6 w-6 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100">
                                  <TrendingUp size={12} />
                               </div>
                            ) : m.score >= 60 ? (
                               <div className="h-6 w-6 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                                  <Minus size={12} />
                               </div>
                            ) : (
                               <div className="h-6 w-6 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600 border border-rose-100">
                                  <TrendingDown size={12} />
                               </div>
                            )}
                         </div>
                      </TableCell>
                      <TableCell className="pr-6 py-4 text-right">
                         <span className="text-[11px] font-black text-slate-400 italic">
                            {m.score >= 80 ? "Level: Mastery" : m.score >= 65 ? "Level: Proficient" : "Level: Developing"}
                         </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
           </Table>
        </CardContent>
      </Card>

      {/* ── Milestone Badges ────────────────────────────────────────── */}
      <div className="p-1 rounded-[32px] bg-gradient-to-r from-slate-100 via-white to-slate-100 border border-slate-200">
         <div className="bg-white rounded-[31px] p-6 lg:p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 px-2">
               <div>
                  <h4 className="text-xl font-black text-slate-900 tracking-tight mb-2">Achievement Milestones</h4>
                  <p className="text-sm text-slate-500 font-medium">Earned badges for consistent effort and academic excellence.</p>
               </div>
               <Badge className="bg-indigo-600 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 h-auto ring-2 ring-white">6 Badges Total</Badge>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
               {[
                 { label: "Attendance Star", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50/50", desc: "100% Present" },
                 { label: "Math Wizard", icon: Zap, color: "text-amber-500", bg: "bg-amber-50/50", desc: "Highest Math Score" },
                 { label: "Early Bird", icon: Calendar, color: "text-indigo-500", bg: "bg-indigo-50/50", desc: "No Late Entries" },
                 { label: "Top Performer", icon: Award, color: "text-purple-500", bg: "bg-purple-50/50", desc: "Top 10% Overall" },
               ].map((b, i) => (
                  <div key={i} className={cn("p-5 rounded-3xl border border-slate-100 flex flex-col items-center text-center group cursor-default transition-all duration-300 hover:shadow-xl hover:shadow-slate-100 hover:border-slate-200", b.bg)}>
                     <div className="h-12 w-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                        <b.icon size={22} className={b.color} />
                     </div>
                     <p className="text-[13px] font-black text-slate-800 tracking-tight mb-1">{b.label}</p>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{b.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </div>

      {/* ── Teacher Recommendation ──────────────────────────────────── */}
      <Card className="shadow-2xl shadow-indigo-100/40 border-indigo-100 overflow-hidden relative">
         <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
            <Trophy size={120} />
         </div>
         <CardContent className="p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row items-center gap-10">
               <div className="h-24 w-24 rounded-3xl bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-2xl shadow-indigo-200 rotate-3 group-hover:rotate-0 transition-transform">
                  <Star size={40} className="fill-white" />
               </div>
               <div className="flex-1 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 mb-4">
                     <span className="h-[1px] w-5 bg-indigo-200" />
                     <p className="text-indigo-600 text-[11px] font-black uppercase tracking-[0.2em]">Overall Assessment</p>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                    "A consistent and dedicated learner who continues to push boundaries across all core subjects."
                  </h3>
                  <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 pt-2">
                     <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl">
                        <div className="h-6 w-6 rounded-full bg-indigo-100" />
                        <span className="text-[11px] font-black text-slate-700">Mrs. Sarah Johnson · Class Teacher</span>
                     </div>
                     <span className="text-[11px] font-bold text-slate-400 italic">Signed electronically: 04 May 2024</span>
                  </div>
               </div>
               <div className="shrink-0 flex flex-col gap-2">
                  <Button className="bg-indigo-600 hover:bg-black text-white font-black text-[11px] h-11 px-8 rounded-2xl gap-2 shadow-xl shadow-indigo-100 uppercase tracking-widest border-0">
                    Teacher Chat <ArrowRight size={14} />
                  </Button>
               </div>
            </div>
         </CardContent>
      </Card>
    </div>
  );
}

