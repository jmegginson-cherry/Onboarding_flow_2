import { useState } from "react";

// Load Figtree + jsPDF
if (typeof document !== 'undefined' && !document.getElementById('cherry-font')) {
  const link = document.createElement('link');
  link.id = 'cherry-font';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800;900&display=swap';
  document.head.appendChild(link);
}
if (typeof document !== 'undefined' && !document.getElementById('jspdf-script')) {
  const s = document.createElement('script');
  s.id = 'jspdf-script';
  s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
  document.head.appendChild(s);
}

const G = "#02C37D";
const GDARK = "#01A066";
const DARK = "#0d1b0d";
const GRAY = "#f5f7f5";
const BORDER = "#e0ece0";
const TEXTGRAY = "#6b7c6b";
const WHITE = "#ffffff";
const font = "'Figtree', -apple-system, BlinkMacSystemFont, sans-serif";

const Logo = () => (
  <img src="https://cdn.prod.website-files.com/681bf1d6f7dea459fe255c59/68252146834983973a92051f_cherry-logo-primary.svg" alt="Cherry" style={{height:28}} />
);

const Pill = ({children}) => (
  <span style={{display:"inline-flex",alignItems:"center",gap:6,background:"#e8f8ee",color:GDARK,border:`1px solid #b6e8c8`,borderRadius:99,padding:"5px 14px",fontSize:13,fontWeight:600,fontFamily:font}}>
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6.5" stroke={GDARK}/><path d="M4 7l2 2 4-4" stroke={GDARK} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    {children}
  </span>
);

const Card = ({children, style={}}) => (
  <div style={{background:WHITE,borderRadius:16,border:`1px solid ${BORDER}`,padding:"28px 32px",marginBottom:20,...style}}>{children}</div>
);

const Btn = ({children,onClick,disabled,outline,sm,style={}}) => (
  <button onClick={onClick} disabled={disabled} style={{
    background:outline?WHITE:disabled?"#d0d0d0":G,
    color:outline?G:WHITE,
    border:`2px solid ${outline?G:disabled?"#d0d0d0":G}`,
    borderRadius:10,padding:sm?"8px 20px":"13px 32px",
    fontSize:sm?13:15,fontWeight:700,cursor:disabled?"not-allowed":"pointer",
    fontFamily:font,letterSpacing:"-0.01em",transition:"all .15s",...style
  }}>{children}</button>
);

const Input = ({label,value,onChange,placeholder,multiline,rows=3}) => (
  <div style={{marginBottom:16}}>
    {label && <label style={{display:"block",fontWeight:600,marginBottom:7,color:DARK,fontSize:13,fontFamily:font}}>{label}</label>}
    {multiline
      ? <textarea value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} rows={rows}
          style={{width:"100%",padding:"11px 14px",borderRadius:10,border:`1.5px solid ${BORDER}`,fontSize:14,fontFamily:font,resize:"vertical",boxSizing:"border-box",color:DARK,outline:"none"}} />
      : <input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
          style={{width:"100%",padding:"11px 14px",borderRadius:10,border:`1.5px solid ${BORDER}`,fontSize:14,fontFamily:font,boxSizing:"border-box",color:DARK,outline:"none"}} />
    }
  </div>
);

const HalfRow = ({children}) => (
  <div style={{display:"flex",flexWrap:"wrap",gap:"0 16px"}}>{children}</div>
);
const Half = ({children}) => (
  <div style={{width:"calc(50% - 8px)",minWidth:180}}>{children}</div>
);

const Check = ({checked,onChange,label,large}) => (
  <label style={{display:"flex",alignItems:"flex-start",gap:12,margin:"10px 0",cursor:"pointer",userSelect:"none"}}>
    <div onClick={()=>onChange(!checked)} style={{
      width:large?24:20,height:large?24:20,minWidth:large?24:20,borderRadius:6,
      border:`2px solid ${checked?G:BORDER}`,background:checked?G:WHITE,
      display:"flex",alignItems:"center",justifyContent:"center",marginTop:1,
      cursor:"pointer",transition:"all .15s",flexShrink:0
    }}>
      {checked && <svg width="12" height="9" viewBox="0 0 12 9"><polyline points="1,4.5 4.5,8 11,1" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>}
    </div>
    <span style={{fontSize:large?15:14,color:DARK,lineHeight:1.55,fontFamily:font}}>{label}</span>
  </label>
);

const ProgressBar = ({step,total}) => (
  <div style={{marginBottom:32}}>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
      <span style={{fontSize:12,color:TEXTGRAY,fontWeight:600,fontFamily:font,letterSpacing:"0.02em",textTransform:"uppercase"}}>Step {step} of {total}</span>
      <span style={{fontSize:12,color:G,fontWeight:700,fontFamily:font}}>{Math.round((step/total)*100)}% Complete</span>
    </div>
    <div style={{height:5,background:BORDER,borderRadius:99,overflow:"hidden"}}>
      <div style={{height:"100%",width:`${(step/total)*100}%`,background:G,borderRadius:99,transition:"width .4s ease"}} />
    </div>
  </div>
);

const H1 = ({children}) => <h1 style={{fontFamily:font,fontSize:32,fontWeight:900,color:DARK,margin:"0 0 12px",letterSpacing:"-0.03em",lineHeight:1.1}}>{children}</h1>;
const H2 = ({children}) => <h2 style={{fontFamily:font,fontSize:20,fontWeight:800,color:DARK,margin:"0 0 8px",letterSpacing:"-0.02em"}}>{children}</h2>;
const H3 = ({children,green}) => <h3 style={{fontFamily:font,fontSize:16,fontWeight:700,color:green?G:DARK,margin:"0 0 6px",letterSpacing:"-0.01em"}}>{children}</h3>;
const Body = ({children,gray,sm,style={}}) => <p style={{fontFamily:font,fontSize:sm?13:14,color:gray?TEXTGRAY:DARK,margin:"0 0 8px",lineHeight:1.65,...style}}>{children}</p>;
const Label = ({children}) => <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",color:TEXTGRAY,fontFamily:font,marginBottom:6}}>{children}</div>;

const SectionDivider = ({title}) => (
  <div style={{display:"flex",alignItems:"center",gap:10,margin:"24px 0 14px",paddingTop:20,borderTop:`1px solid ${BORDER}`}}>
    <div style={{width:3,height:18,background:G,borderRadius:2}}/>
    <span style={{fontFamily:font,fontWeight:800,fontSize:11,letterSpacing:"0.1em",textTransform:"uppercase",color:G}}>{title}</span>
  </div>
);

const NumberBullet = ({n,title,body}) => (
  <div style={{display:"flex",gap:14,margin:"14px 0"}}>
    <div style={{width:28,height:28,minWidth:28,borderRadius:99,background:G,display:"flex",alignItems:"center",justifyContent:"center",marginTop:1}}>
      <span style={{color:WHITE,fontWeight:800,fontSize:13,fontFamily:font}}>{n}</span>
    </div>
    <div><Body><strong>{title}</strong> {body}</Body></div>
  </div>
);

const VALUE_PROPS = [
  {title:"Lightning Fast",body:"Taking a \"quick peek\" with Cherry first is a fast and easy ask to a patient with no downside."},
  {title:"No Hard Credit Check",body:"...at any point in the process \u2014 patients are more comfortable to apply."},
  {title:"True 0% APR Offers",body:"Ditch the predatory 'no interest if paid in full' (deferred interest) bait-and-switch, which is highly scrutinized by the CFPB."},
  {title:"Lower Fees",body:"Most practices keep at least 1\u20132% more of every transaction with our lower fees."},
  {title:"Not a Credit Card",body:"Get your staff out of the business of selling medical credit cards."},
  {title:"Higher Approval Amounts",body:"Optimize for full and optimal treatments."},
];

const milestones = [
  {label:"Good",color:"#888",bg:"#f5f5f5",border:"#d8d8d8",reward:"$50",estimators:4,apps:2,checkouts:1,by:"By First Review Call"},
  {label:"Better",color:"#B8860B",bg:"#fffbf0",border:"#f0d080",reward:"$75",estimators:8,apps:4,checkouts:2,by:"By Second Review Call"},
  {label:"Best",color:"#4A7FD4",bg:"#f0f5ff",border:"#b8d0f8",reward:"$100",estimators:12,apps:6,checkouts:3,by:"By Day 30"},
];

// Step order: 1=Welcome, 2=Commitment, 3=Discovery, 4=Practice Demo, 5=Milestones, 6=Goals, 7=Summary
const STEPS = 7;

// ── PRE-LOAD ─────────────────────────────────────────────────────────────────
function PreloadStep({onComplete}) {
  const [practiceName,setPracticeName]=useState("");
  const [error,setError]=useState("");

  return (
    <div style={{minHeight:"100vh",background:GRAY,display:"flex",alignItems:"center",justifyContent:"center",padding:24,fontFamily:font}}>
      <div style={{maxWidth:500,width:"100%"}}>
        <div style={{textAlign:"center",marginBottom:36}}>
          <Logo/>
          <h1 style={{fontSize:28,fontWeight:900,color:DARK,marginTop:20,marginBottom:8,letterSpacing:"-0.03em",fontFamily:font}}>Welcome to Cherry!</h1>
          <p style={{color:TEXTGRAY,fontSize:15,fontFamily:font,margin:0}}>Let's get your practice set up for a successful launch.</p>
        </div>
        <Card>
          <Input label="Practice Name" value={practiceName} onChange={setPracticeName} placeholder="e.g. Bright Smiles Dental"/>
          {error&&<p style={{color:"#e53e3e",fontSize:13,fontFamily:font,margin:"0 0 12px"}}>{error}</p>}
          <Btn onClick={()=>{
            if(!practiceName.trim()){setError("Please enter your practice name.");return;}
            onComplete({practiceName:practiceName.trim(),websiteUrl:"N/A",repName:"",city:"",state:"",doctors:[],specialty:"Dental"});
          }} style={{width:"100%",marginTop:4}}>Begin Onboarding Session</Btn>
        </Card>
      </div>
    </div>
  );
}

// ── SUMMARY VIEW ──────────────────────────────────────────────────────────────
function SummaryView({data,onRestart}) {
  const {practice,initials,discovery,goals,launchDate,review1Date,review2Date,repNotes}=data;
  const today=new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});
  const loc=[practice.city,practice.state].filter(Boolean).join(", ");
  const [copied,setCopied]=useState(false);

  const plain=`CHERRY ONBOARDING SUMMARY — ${practice.practiceName}
${loc?loc+"\n":""}Session Date: ${today} | Rep: ${practice.repName}

CHERRY-FIRST COMMITMENT
[${initials.q1?"X":" "}] Committed to offering Cherry first to all patients with out-of-pocket expenses.
[${initials.q2?"X":" "}] Committed to putting Cherry first on website and over the phone, never as a backup.

PRACTICE DISCOVERY
Patients w/ out-of-pocket cost/week: ${discovery.patientsPerWeek||"—"}
Avg. out-of-pocket treatment cost: ${discovery.avgCost||"—"}
Current financing options: ${discovery.currentFinancing||"—"}
% patients declining due to cost: ${discovery.declineRate||"—"}
How treatment plans/financing are presented: ${discovery.presentationMethod||"—"}
How patients apply with current financing: ${discovery.currentApplyMethod||"—"}

GOALS
Launch Date: ${launchDate||"—"}
First Review Call: ${review1Date||"—"} — Estimators: ${goals.r1Estimators||"—"} | Apps: ${goals.r1Apps||"—"} | Checkouts: ${goals.r1Checkouts||"—"}
Second Review Call: ${review2Date||"—"} — Estimators: ${goals.r2Estimators||"—"} | Apps: ${goals.r2Apps||"—"} | Checkouts: ${goals.r2Checkouts||"—"}
Website Live: ${goals.websiteLive?"Yes":"No"} | QR on Intake: ${goals.qrIntake?"Yes":"No"} | Team Training: ${goals.teamTraining?"Yes":"No"}

NEXT STEPS
Let's practice your first application and checkout!
${repNotes||"No additional notes."}

withcherry.com`;

  const copy=()=>{navigator.clipboard.writeText(plain);setCopied(true);setTimeout(()=>setCopied(false),2500);};

  const download = () => {
    const { jsPDF } = window.jspdf;
    if (!jsPDF) { alert("PDF library still loading, please try again in a moment."); return; }
    const doc = new jsPDF({ unit: "pt", format: "letter" });
    const W = doc.internal.pageSize.getWidth();
    const H = doc.internal.pageSize.getHeight();
    const margin = 48;
    const contentW = W - margin * 2;
    let y = 0;

    const hex2rgb = h => { const r=parseInt(h.slice(1,3),16),g=parseInt(h.slice(3,5),16),b=parseInt(h.slice(5,7),16); return [r,g,b]; };
    const setFill = c => { const [r,g,b]=hex2rgb(c); doc.setFillColor(r,g,b); };
    const setTxt = c => { const [r,g,b]=hex2rgb(c); doc.setTextColor(r,g,b); };
    const setDraw = c => { const [r,g,b]=hex2rgb(c); doc.setDrawColor(r,g,b); };

    const checkPage = (needed=20) => {
      if (y + needed > H - 40) { doc.addPage(); y = 48; }
    };

    // ── HEADER BAND ──
    setFill("#019860"); doc.rect(0, 0, W, 90, "F");
    setTxt("#ffffff");
    doc.setFontSize(22); doc.setFont("helvetica","bold");
    doc.text(practice.practiceName || "Your Practice", margin, 38);
    const loc = [practice.city, practice.state].filter(Boolean).join(", ");
    if (loc) { doc.setFontSize(11); doc.setFont("helvetica","normal"); doc.text(loc, margin, 54); }
    doc.setFontSize(10); doc.setFont("helvetica","normal");
    doc.text("Cherry Onboarding Summary", W - margin, 32, { align:"right" });
    doc.text(new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}), W - margin, 46, { align:"right" });

    // ── STATS BAR ──
    setFill("#f0faf3"); doc.rect(0, 90, W, 36, "F");
    setDraw("#e0ece0"); doc.setLineWidth(0.5); doc.line(0, 90, W, 90); doc.line(0, 126, W, 126);
    const stats = [["Launch Date", launchDate||"TBD"], ["First Review Call", review1Date||"TBD"], ["Second Review Call", review2Date||"TBD"]];
    stats.forEach(([label, val], i) => {
      const x = margin + i * (contentW / 3);
      setTxt("#6b7c6b"); doc.setFontSize(8); doc.setFont("helvetica","bold");
      doc.text(label.toUpperCase(), x, 104);
      setTxt("#0d1b0d"); doc.setFontSize(11); doc.setFont("helvetica","bold");
      doc.text(val, x, 118);
      if (i < 2) { setDraw("#e0ece0"); doc.line(margin + (i+1)*(contentW/3), 92, margin + (i+1)*(contentW/3), 124); }
    });

    y = 148;

    const sectionHeader = (title) => {
      checkPage(30);
      setFill("#02C37D"); doc.rect(margin, y, 3, 16, "F");
      setTxt("#02C37D"); doc.setFontSize(9); doc.setFont("helvetica","bold");
      doc.text(title.toUpperCase(), margin + 10, y + 11);
      setDraw("#e0ece0"); doc.setLineWidth(0.5); doc.line(margin + 10 + doc.getTextWidth(title.toUpperCase()) + 6, y + 7, W - margin, y + 7);
      y += 26;
    };

    const bodyLine = (text, indent=0, bold=false, color="#0d1b0d") => {
      checkPage(18);
      setTxt(color);
      doc.setFontSize(10); doc.setFont("helvetica", bold?"bold":"normal");
      const lines = doc.splitTextToSize(text, contentW - indent);
      doc.text(lines, margin + indent, y);
      y += lines.length * 14 + 2;
    };

    const checkRow = (checked, label) => {
      checkPage(24);
      setDraw(checked ? "#02C37D" : "#e0ece0");
      setFill(checked ? "#02C37D" : "#ffffff");
      doc.setLineWidth(1);
      doc.roundedRect(margin, y - 10, 11, 11, 2, 2, checked ? "FD" : "D");
      if (checked) {
        setTxt("#ffffff"); doc.setFontSize(8); doc.setFont("helvetica","bold");
        doc.text("✓", margin + 2, y - 1);
      }
      setTxt("#0d1b0d"); doc.setFontSize(10); doc.setFont("helvetica","normal");
      const lines = doc.splitTextToSize(label, contentW - 18);
      doc.text(lines, margin + 18, y);
      y += lines.length * 14 + 8;
    };

    const rowPair = (label, val) => {
      if (!val) return;
      checkPage(18);
      setTxt("#6b7c6b"); doc.setFontSize(9); doc.setFont("helvetica","normal");
      doc.text(label, margin, y);
      setTxt("#0d1b0d"); doc.setFontSize(10); doc.setFont("helvetica","bold");
      const lines = doc.splitTextToSize(val, contentW - 200);
      doc.text(lines, margin + 200, y);
      y += Math.max(lines.length * 13, 14) + 4;
    };

    const goalBox = (title, date, e, a, c) => {
      checkPage(100);
      setFill("#f5f7f5"); setDraw("#e0ece0"); doc.setLineWidth(0.5);
      doc.roundedRect(margin, y, contentW / 2 - 6, 90, 4, 4, "FD");
      setTxt("#0d1b0d"); doc.setFontSize(10); doc.setFont("helvetica","bold");
      doc.text(title, margin + 12, y + 18);
      if (date) { setTxt("#6b7c6b"); doc.setFontSize(9); doc.setFont("helvetica","normal"); doc.text(date, margin + 12, y + 32); }
      [["Estimators", e], ["Applications", a], ["Checkouts", c]].forEach(([l, v], i) => {
        setTxt("#6b7c6b"); doc.setFontSize(9); doc.setFont("helvetica","normal");
        doc.text(l, margin + 12, y + 52 + i * 16);
        setTxt("#02C37D"); doc.setFontSize(11); doc.setFont("helvetica","bold");
        doc.text(v || "—", margin + contentW/2 - 18, y + 52 + i * 16, { align:"right" });
      });
    };

    // ── COMMITMENT ──
    sectionHeader("Cherry-First Commitment");
    checkRow(initials.q1, "Committed to offering Cherry first to all patients with out-of-pocket expenses.");
    checkRow(initials.q2, "Committed to putting Cherry first on their website and over the phone, never as a backup option.");
    y += 6;

    // ── DISCOVERY ──
    sectionHeader("Practice Discovery");
    rowPair("Patients w/ out-of-pocket cost/week", discovery.patientsPerWeek);
    rowPair("Average out-of-pocket treatment cost", discovery.avgCost);
    rowPair("Current financing options", discovery.currentFinancing);
    rowPair("Who presents financing", discovery.financingPresenter);
    rowPair("% declining due to cost", discovery.declineRate);
    rowPair("How treatment plans are presented", discovery.presentationMethod);
    rowPair("Treatment plans w/ OOP cost per week", discovery.treatmentPlansPerWeek);
    rowPair("How patients apply currently", discovery.currentApplyMethod);
    y += 6;

    // ── GOALS ──
    sectionHeader("Goals by Review Calls");
    goalBox("By First Review Call", review1Date, goals.r1Estimators, goals.r1Apps, goals.r1Checkouts);
    // second box — offset to the right
    const savedY = y;
    y = savedY;
    setFill("#f5f7f5"); setDraw("#e0ece0"); doc.setLineWidth(0.5);
    doc.roundedRect(margin + contentW/2 + 6, savedY, contentW/2 - 6, 90, 4, 4, "FD");
    setTxt("#0d1b0d"); doc.setFontSize(10); doc.setFont("helvetica","bold");
    doc.text("By Second Review Call", margin + contentW/2 + 18, savedY + 18);
    if (review2Date) { setTxt("#6b7c6b"); doc.setFontSize(9); doc.setFont("helvetica","normal"); doc.text(review2Date, margin + contentW/2 + 18, savedY + 32); }
    [["Estimators", goals.r2Estimators], ["Applications", goals.r2Apps], ["Checkouts", goals.r2Checkouts]].forEach(([l, v], i) => {
      setTxt("#6b7c6b"); doc.setFontSize(9); doc.setFont("helvetica","normal");
      doc.text(l, margin + contentW/2 + 18, savedY + 52 + i * 16);
      setTxt("#02C37D"); doc.setFontSize(11); doc.setFont("helvetica","bold");
      doc.text(v || "—", W - margin - 6, savedY + 52 + i * 16, { align:"right" });
    });
    y = savedY + 98;

    y += 10;
    checkRow(goals.websiteLive, "Cherry added to practice website");
    checkRow(goals.qrIntake, "Cherry QR code added to patient intake forms");
    checkRow(goals.teamTraining, "Front desk team training scheduled");
    y += 6;

    // ── NEXT STEPS ──
    sectionHeader("Next Steps");
    checkPage(40);
    setFill("#e8f8ee"); setDraw("#b6e8c8"); doc.setLineWidth(0.5);
    const nsLines = doc.splitTextToSize("Let's practice your first application and checkout! Walk through a live Cherry application together so your front desk feels confident from day one.", contentW - 24);
    doc.roundedRect(margin, y, contentW, nsLines.length * 13 + 20, 4, 4, "FD");
    setTxt("#01A066"); doc.setFontSize(10); doc.setFont("helvetica","bold");
    doc.text(nsLines, margin + 12, y + 14);
    y += nsLines.length * 13 + 28;

    if (repNotes) { bodyLine(repNotes, 0, false, "#444444"); y += 4; }

    // ── FOOTER ──
    checkPage(30);
    setDraw("#e0ece0"); doc.setLineWidth(0.5); doc.line(margin, y, W - margin, y);
    y += 14;
    setTxt("#6b7c6b"); doc.setFontSize(9); doc.setFont("helvetica","normal");
    doc.text("withcherry.com · provider.withcherry.com", W / 2, y, { align:"center" });

    doc.save(`Cherry_Onboarding_${(practice.practiceName||"Practice").replace(/\s+/g,"_")}.pdf`);
  };

  const Row=({label,val})=>val?(<div style={{display:"flex",gap:12,margin:"7px 0"}}><span style={{fontFamily:font,fontSize:13,color:TEXTGRAY,minWidth:240,flexShrink:0}}>{label}</span><span style={{fontFamily:font,fontSize:13,color:DARK,fontWeight:600}}>{val}</span></div>):null;
  const CommitRow=({checked,label})=>(<div style={{display:"flex",gap:10,alignItems:"flex-start",margin:"7px 0"}}><div style={{width:16,height:16,minWidth:16,borderRadius:4,border:`2px solid ${checked?G:BORDER}`,background:checked?G:WHITE,display:"flex",alignItems:"center",justifyContent:"center",marginTop:1}}>{checked&&<svg width="9" height="7" viewBox="0 0 9 7"><polyline points="1,3.5 3.5,6 8,1" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>}</div><span style={{fontFamily:font,fontSize:13,color:checked?DARK:TEXTGRAY,lineHeight:1.5}}>{label}</span></div>);

  return (
    <div style={{minHeight:"100vh",background:GRAY,padding:"32px 20px 80px",fontFamily:font}}>
      <div style={{maxWidth:680,margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
          <Btn outline sm onClick={onRestart}>Back</Btn>
          <div style={{display:"flex",gap:8}}>
            <Btn outline sm onClick={copy}>{copied?"Copied!":"Copy Text"}</Btn>
            <Btn sm onClick={download}>Download Summary</Btn>
          </div>
        </div>
        <div style={{background:WHITE,borderRadius:20,border:`1px solid ${BORDER}`,overflow:"hidden",boxShadow:"0 4px 40px rgba(0,0,0,0.06)"}}>
          <div style={{background:G,padding:"32px 40px 28px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12}}>
              <div>
                <img src="https://cdn.prod.website-files.com/681bf1d6f7dea459fe255c59/68252146834983973a92051f_cherry-logo-primary.svg" alt="Cherry" style={{height:22,filter:"brightness(0) invert(1)",marginBottom:14}}/>
                <div style={{fontSize:24,fontWeight:900,color:WHITE,letterSpacing:"-0.03em",lineHeight:1.1,fontFamily:font}}>{practice.practiceName}</div>
                {loc&&<div style={{fontSize:14,color:"rgba(255,255,255,0.8)",marginTop:4,fontFamily:font}}>{loc}</div>}
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:11,color:"rgba(255,255,255,0.65)",fontFamily:font,marginBottom:4,textTransform:"uppercase",letterSpacing:"0.06em"}}>Onboarding Summary</div>
                <div style={{fontSize:13,color:WHITE,fontFamily:font,fontWeight:600}}>{today}</div>

              </div>
            </div>
          </div>
          <div style={{background:"#f0faf3",borderBottom:`1px solid ${BORDER}`,display:"flex",flexWrap:"wrap"}}>
            {[{label:"Launch Date",val:launchDate||"TBD"},{label:"First Review Call",val:review1Date||"TBD"},{label:"Second Review Call",val:review2Date||"TBD"}].map((item,i)=>(
              <div key={i} style={{flex:"1 1 120px",padding:"14px 20px",borderRight:i<2?`1px solid ${BORDER}`:"none"}}>
                <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:TEXTGRAY,fontFamily:font,marginBottom:3}}>{item.label}</div>
                <div style={{fontSize:13,fontWeight:800,color:DARK,fontFamily:font}}>{item.val}</div>
              </div>
            ))}
          </div>
          <div style={{padding:"8px 40px 40px"}}>
            <SectionDivider title="Cherry-First Commitment"/>
            <CommitRow checked={initials.q1} label="Committed to offering Cherry first to all patients with out-of-pocket expenses."/>
            <CommitRow checked={initials.q2} label="Committed to putting Cherry first on their website and over the phone, never as a backup option."/>

            <SectionDivider title="Practice Discovery"/>
            <Row label="Patients w/ out-of-pocket cost/week" val={discovery.patientsPerWeek}/>
            <Row label="Average out-of-pocket treatment cost" val={discovery.avgCost}/>
            <Row label="Current financing options" val={discovery.currentFinancing}/>
            <Row label="% declining due to cost" val={discovery.declineRate}/>
            <Row label="How treatment plans/financing are presented" val={discovery.presentationMethod}/>
            <Row label="How patients apply with current financing" val={discovery.currentApplyMethod}/>

            <SectionDivider title="Goals by Review Calls"/>
            <div style={{display:"flex",gap:12,flexWrap:"wrap",margin:"8px 0 16px"}}>
              {[{label:`By First Review Call\n${review1Date||"TBD"}`,e:goals.r1Estimators,a:goals.r1Apps,c:goals.r1Checkouts},{label:`By Second Review Call\n${review2Date||"TBD"}`,e:goals.r2Estimators,a:goals.r2Apps,c:goals.r2Checkouts}].map((g,i)=>(
                <div key={i} style={{flex:"1 1 220px",background:GRAY,borderRadius:12,padding:"16px 18px"}}>
                  <div style={{fontWeight:800,fontSize:12,color:DARK,fontFamily:font,marginBottom:10,whiteSpace:"pre-line"}}>{g.label}</div>
                  {[["Estimators",g.e],["Applications",g.a],["Checkouts",g.c]].map(([l,v])=>(
                    <div key={l} style={{display:"flex",justifyContent:"space-between",margin:"5px 0"}}>
                      <span style={{fontSize:13,color:TEXTGRAY,fontFamily:font}}>{l}</span>
                      <span style={{fontSize:13,fontWeight:700,color:G,fontFamily:font}}>{v||"—"}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <CommitRow checked={goals.websiteLive} label="Cherry added to practice website"/>
            <CommitRow checked={goals.qrIntake} label="Cherry QR code added to patient intake forms"/>
            <CommitRow checked={goals.teamTraining} label="Front desk team training scheduled"/>

            <SectionDivider title="Next Steps"/>
            <div style={{background:"#e8f8ee",border:`1px solid #b6e8c8`,borderRadius:12,padding:"16px 20px",marginBottom:14}}>
              <div style={{fontWeight:800,fontSize:14,color:GDARK,fontFamily:font,marginBottom:4}}>Let's practice your first application and checkout!</div>
              <Body sm gray>Walk through a live Cherry application together before ending this session so your front desk feels confident from day one.</Body>
            </div>
            {repNotes&&<div style={{background:GRAY,borderRadius:10,padding:"14px 18px"}}><Label>Additional Notes</Label><Body sm>{repNotes}</Body></div>}
            <div style={{borderTop:`1px solid ${BORDER}`,marginTop:32,paddingTop:20,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
              <img src="https://cdn.prod.website-files.com/681bf1d6f7dea459fe255c59/68252146834983973a92051f_cherry-logo-primary.svg" alt="Cherry" style={{height:18,opacity:0.5}}/>
              <span style={{fontSize:12,color:TEXTGRAY,fontFamily:font}}>withcherry.com · provider.withcherry.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── MAIN ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [practice,setPractice]=useState(null);
  const [step,setStep]=useState(1);
  const [initials,setInitials]=useState({q1:false,q2:false});
  const [discovery,setDiscovery]=useState({patientsPerWeek:"",avgCost:"",currentFinancing:"",financingPresenter:"",declineRate:"",presentationMethod:"",treatmentPlansPerWeek:"",currentApplyMethod:""});
  const [goals,setGoals]=useState({r1Estimators:"",r1Apps:"",r1Checkouts:"",r2Estimators:"",r2Apps:"",r2Checkouts:"",websiteLive:false,qrIntake:false,teamTraining:false});
  const [launchDate,setLaunchDate]=useState("");
  const [review1Date,setReview1Date]=useState("");
  const [review2Date,setReview2Date]=useState("");
  const [repNotes,setRepNotes]=useState("");
  const [showSummary,setShowSummary]=useState(false);

  if(!practice) return <PreloadStep onComplete={setPractice}/>;
  if(showSummary) return <SummaryView data={{practice,initials,discovery,goals,launchDate,review1Date,review2Date,repNotes}} onRestart={()=>{setPractice(null);setStep(1);setShowSummary(false);}}/>;

  const pName=practice.practiceName||"Your Practice";
  const repName=practice.repName||"Rep";
  const loc=[practice.city,practice.state].filter(Boolean).join(", ");

  const next=()=>{if(step===STEPS){setShowSummary(true);}else setStep(s=>s+1);};
  const prev=()=>setStep(s=>Math.max(s-1,1));
  const canProceed=()=>{
    if(step===2) return initials.q1&&initials.q2;
    return true;
  };

  // Step labels for context
  const stepLabels=["Welcome","Commitment","Discovery","Practice Demo","Milestone Rewards","Goals","Summary"];

  const stepContent=()=>{
    switch(step){

      // ── STEP 1: WELCOME ──
      case 1: return (
        <>
          <div style={{marginBottom:8}}><Pill>Dental Onboarding</Pill></div>
          <H1>Welcome to <span style={{color:G}}>Cherry</span></H1>
          <div style={{background:G,borderRadius:14,padding:"20px 24px",marginBottom:20}}>
            <p style={{fontFamily:font,fontSize:16,fontWeight:700,color:WHITE,margin:"0 0 4px",lineHeight:1.5}}>Congratulations on joining thousands of practices who have chosen Cherry as their primary payment provider.</p>
            <p style={{fontFamily:font,fontSize:13,color:"rgba(255,255,255,0.85)",margin:0,lineHeight:1.6}}>You're in excellent company — and we're here to make sure your launch sets the tone for long-term growth.</p>
          </div>

          <Card>
            <H3>Why Cherry Works</H3>
            <Body sm gray style={{marginBottom:16}}>Here's what makes Cherry different from everything else your patients have seen.</Body>
            {VALUE_PROPS.map((vp,i)=>(
              <div key={i} style={{display:"flex",gap:14,padding:"12px 0",borderBottom:i<VALUE_PROPS.length-1?`1px solid ${BORDER}`:"none"}}>
                <div style={{width:6,height:6,minWidth:6,borderRadius:99,background:G,marginTop:8,flexShrink:0}}/>
                <div><span style={{fontFamily:font,fontSize:14,fontWeight:700,color:DARK}}>{vp.title} </span><span style={{fontFamily:font,fontSize:14,color:TEXTGRAY}}>{vp.body}</span></div>
              </div>
            ))}
          </Card>
          {loc&&<div style={{padding:"10px 16px",background:"#fffbf0",borderRadius:10,border:"1px solid #f0d080"}}><Body sm>Pre-loaded for <strong>{pName}</strong>{loc?` in ${loc}`:""} — your rep will confirm details as you go.</Body></div>}
        </>
      );

      // ── STEP 2: COMMITMENT ──
      case 2: return (
        <>
          <div style={{marginBottom:8}}><Pill>Commitment</Pill></div>
          <H1>The Cherry-<span style={{color:G}}>First</span> Commitment</H1>
          <Body gray>Cherry works best when it's the first option offered — before anything else. Please confirm each commitment below.</Body>
          <div style={{height:8}}/>
          <Card style={{background:"#f0faf3",border:`1px solid ${G}`,marginBottom:16,padding:"16px 20px"}}>
            <Body sm><strong style={{color:GDARK}}>Why this matters:</strong> Practices that offer Cherry first see 3x more checkouts in their first 30 days versus those who offer it as a secondary option.</Body>
          </Card>
          <Card>
            <Check large checked={initials.q1} onChange={v=>setInitials(p=>({...p,q1:v}))}
              label="Are you committed to offering Cherry first to all your patients with out-of-pocket expenses?"/>
            <div style={{height:8}}/>
            <Check large checked={initials.q2} onChange={v=>setInitials(p=>({...p,q2:v}))}
              label="Are you willing to put Cherry first on your website and offer us first over the phone and never as a backup option?"/>
            {!canProceed()&&<p style={{fontSize:12,color:"#d97706",margin:"14px 0 0",fontFamily:font}}>Both commitments are required to continue.</p>}
            {canProceed()&&<div style={{marginTop:14,padding:"10px 16px",background:"#e8f8ee",borderRadius:8,border:`1px solid #b6e8c8`}}><Body sm><strong style={{color:GDARK}}>Commitment acknowledged by {pName}. Thank you!</strong></Body></div>}
          </Card>
          <Card style={{background:"#f8f8f8",border:`1px solid ${BORDER}`}}>
            <Label>Suggested front desk script</Label>
            <Body sm style={{fontStyle:"italic",color:"#444"}}>"We offer a few ways to pay: cash, credit, or Cherry payment plans. Cherry takes about 60 seconds to apply — it's just a soft credit check — and a lot of our patients love the flexibility. Want to see if you qualify?"</Body>
          </Card>
        </>
      );

      // ── STEP 3: DISCOVERY ──
      case 3: return (
        <>
          <div style={{marginBottom:8}}><Pill>Discovery</Pill></div>
          <H1>Practice <span style={{color:G}}>Discovery</span></H1>
          <Body gray>Help us understand your practice so we can tailor your launch. Your onboarding rep will fill this in as you talk.</Body>
          <div style={{height:8}}/>
          <Card>
            <HalfRow>
              <Half><Input label="Patients with an out-of-pocket cost per week?" value={discovery.patientsPerWeek} onChange={v=>setDiscovery(p=>({...p,patientsPerWeek:v}))} placeholder="e.g. 20"/></Half>
              <Half><Input label="Average out-of-pocket treatment cost?" value={discovery.avgCost} onChange={v=>setDiscovery(p=>({...p,avgCost:v}))} placeholder="e.g. $1,200"/></Half>
            </HalfRow>
            <Input label="What financing options do you currently offer patients?" value={discovery.currentFinancing} onChange={v=>setDiscovery(p=>({...p,currentFinancing:v}))} placeholder="e.g. CareCredit, in-house payment plans, none"/>
            <Input label="Who presents financing at your office?" value={discovery.financingPresenter} onChange={v=>setDiscovery(p=>({...p,financingPresenter:v}))} placeholder="e.g. front desk, treatment coordinator, doctor"/>
            <Input label="What percentage of patients decline treatment due to cost?" value={discovery.declineRate} onChange={v=>setDiscovery(p=>({...p,declineRate:v}))} placeholder="e.g. 20–30%"/>
            <Input label="How are treatment plans and financing currently presented?" value={discovery.presentationMethod} onChange={v=>setDiscovery(p=>({...p,presentationMethod:v}))} placeholder="e.g. digital, printed treatment plan, verbally at checkout"/>
            <Input label="How many treatment plans with out-of-pocket costs do you present each week?" value={discovery.treatmentPlansPerWeek} onChange={v=>setDiscovery(p=>({...p,treatmentPlansPerWeek:v}))} placeholder="e.g. 10–15"/>
            <Input label="How are patients applying with your current financing options?" value={discovery.currentApplyMethod} onChange={v=>setDiscovery(p=>({...p,currentApplyMethod:v}))} placeholder="e.g. paper form, tablet in office, patient's phone, link sent via text"/>
          </Card>
        </>
      );

      // ── STEP 4: PRACTICE DEMO (was step 6) ──
      case 4: return (
        <>
          <div style={{marginBottom:8}}><Pill>Live Demo</Pill></div>
          <H1>Let's Practice Your First <span style={{color:G}}>Checkout!</span></H1>
          <Body gray>Before setting goals, let's walk through a live Cherry application together so your front desk feels confident from day one.</Body>
          <div style={{height:8}}/>
          <Card style={{background:"#f0faf3",border:`2px solid ${G}`}}>
            <Label>Action Item</Label>
            <H2>Let's practice your first application and checkout!</H2>
            <Body gray>Walk through a live Cherry application together right now — no guessing, no hesitation on day one.</Body>
            <div style={{height:12}}/>
            {["Open your Cherry provider dashboard at provider.withcherry.com","Enter a sample patient name and phone number","Walk through the 60-second application together","Complete a practice checkout so the flow feels natural"].map((t,i)=>(
              <div key={i} style={{display:"flex",gap:12,alignItems:"flex-start",margin:"8px 0"}}>
                <div style={{width:22,height:22,minWidth:22,borderRadius:99,background:G,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <span style={{color:WHITE,fontWeight:800,fontSize:11,fontFamily:font}}>{i+1}</span>
                </div>
                <Body sm style={{marginTop:3}}>{t}</Body>
              </div>
            ))}
          </Card>
          <Card>
            <H3>What Happens Next</H3>
            <div style={{marginTop:8}}>
              {["After the demo, we'll set your goals and milestones for the first 30 days","Your Cherry rep will follow up on your first review call date","Access your dashboard anytime at provider.withcherry.com","Questions? Support is at withcherry.com/help-center/for-providers"].map((t,i)=>(
                <div key={i} style={{display:"flex",gap:10,margin:"8px 0",alignItems:"flex-start"}}>
                  <div style={{width:6,height:6,minWidth:6,borderRadius:99,background:G,marginTop:6}}/>
                  <Body sm>{t}</Body>
                </div>
              ))}
            </div>
          </Card>
        </>
      );

      // ── STEP 5: MILESTONES (was step 4) ──
      case 5: return (
        <>
          <div style={{marginBottom:8}}><Pill>Launch Plan</Pill></div>
          <H1>Earn Rewards for <span style={{color:G}}>Strong Starts</span></H1>
          <Body gray>Hit your milestones at each review call and earn cash rewards. The total amount will be paid out after your onboarding ends.</Body>
          <div style={{height:8}}/>
          <Card>
            <H3>Step-Up Milestone Rewards</H3>
            <Body sm gray style={{marginBottom:16}}>Each tier is a milestone checkpoint — hit Good by your first call, Better by your second, and Best by Day 30.</Body>
            <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
              {milestones.map(m=>(
                <div key={m.label} style={{flex:"1 1 150px",background:m.bg,border:`1.5px solid ${m.border}`,borderRadius:14,padding:"20px 16px",textAlign:"center"}}>
                  <div style={{fontWeight:800,fontSize:12,color:m.color,letterSpacing:"0.08em",textTransform:"uppercase",fontFamily:font,marginBottom:6}}>{m.label}</div>
                  <div style={{fontSize:34,fontWeight:900,color:DARK,fontFamily:font,letterSpacing:"-0.04em",lineHeight:1}}>{m.reward}</div>
                  <div style={{fontSize:11,color:TEXTGRAY,fontFamily:font,marginBottom:14}}>{m.by}</div>
                  <div style={{background:"rgba(255,255,255,0.75)",borderRadius:8,padding:"10px 12px",textAlign:"left"}}>
                    {[["Estimators",m.estimators],["Applications",m.apps],["Checkouts",m.checkouts]].map(([l,v])=>(
                      <div key={l} style={{display:"flex",justifyContent:"space-between",margin:"4px 0"}}>
                        <span style={{fontSize:12,color:TEXTGRAY,fontFamily:font}}>{l}</span>
                        <span style={{fontSize:12,fontWeight:700,color:DARK,fontFamily:font}}>{v}+</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div style={{background:"#e8f8ee",border:`1px solid #b6e8c8`,borderRadius:10,padding:"12px 16px",marginTop:16}}>
              <Body sm><strong style={{color:GDARK}}>Note:</strong> Rewards are cumulative — hitting Better means you've also earned Good. All metrics are tracked in your Cherry provider dashboard. The total amount will be paid out after your onboarding ends.</Body>
            </div>
          </Card>
        </>
      );

      // ── STEP 6: GOALS ──
      case 6: return (
        <>
          <div style={{marginBottom:8}}><Pill>Goals</Pill></div>
          <H1>Set Your <span style={{color:G}}>Goals</span></H1>
          <Body gray>Your onboarding rep will help you set goals tied to your two review calls.</Body>
          <div style={{height:8}}/>
          <Card style={{borderLeft:`4px solid ${G}`,paddingLeft:28}}>
            <H3>Why We Do Launch Plans</H3>
            <Body gray sm>Build habits that drive long-term revenue for <strong style={{color:DARK}}>{pName}</strong></Body>
            <div style={{height:4}}/>
            <Body><strong>The first two weeks set the tone for everything</strong></Body>
            <NumberBullet n={1} title="We want you to feel confident using Cherry:" body="Using Cherry in the first 30 days is the best way to learn your new workflows."/>
            <NumberBullet n={2} title="Patient feedback:" body="Seeing which options patients choose helps you structure how you offer Cherry more effectively."/>
            <NumberBullet n={3} title="Solve small issues before they impact revenue." body="Fixing friction early prevents patients walking out your door!"/>
          </Card>
          <Card>
            <H3>Key Schedule Dates</H3>
            <div style={{height:8}}/>
            <HalfRow>
              <Half><Input label="Launch Date" value={launchDate} onChange={setLaunchDate} placeholder="e.g. 03/17/2026"/></Half>
              <Half><Input label="First Review Call Date" value={review1Date} onChange={setReview1Date} placeholder="e.g. 03/24/2026"/></Half>
            </HalfRow>
            <HalfRow>
              <Half><Input label="Second Review Call Date" value={review2Date} onChange={setReview2Date} placeholder="e.g. 03/31/2026"/></Half>
            </HalfRow>
          </Card>
          <Card style={{border:`1.5px solid ${BORDER}`}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
              <div style={{width:3,height:20,background:G,borderRadius:2,flexShrink:0}}/>
              <div><H3>By the First Review Call</H3>{review1Date&&<Body sm gray style={{margin:0}}>{review1Date}</Body>}</div>
            </div>
            <HalfRow>
              <Half><Input label="Payment Estimator Goal" value={goals.r1Estimators} onChange={v=>setGoals(p=>({...p,r1Estimators:v}))} placeholder="e.g. 4"/></Half>
              <Half><Input label="Application Goal" value={goals.r1Apps} onChange={v=>setGoals(p=>({...p,r1Apps:v}))} placeholder="e.g. 2"/></Half>
            </HalfRow>
            <HalfRow>
              <Half><Input label="Checkout Goal" value={goals.r1Checkouts} onChange={v=>setGoals(p=>({...p,r1Checkouts:v}))} placeholder="e.g. 1"/></Half>
            </HalfRow>
          </Card>
          <Card style={{border:`1.5px solid ${BORDER}`}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
              <div style={{width:3,height:20,background:G,borderRadius:2,flexShrink:0}}/>
              <div><H3>By the Second Review Call</H3>{review2Date&&<Body sm gray style={{margin:0}}>{review2Date}</Body>}</div>
            </div>
            <HalfRow>
              <Half><Input label="Payment Estimator Goal" value={goals.r2Estimators} onChange={v=>setGoals(p=>({...p,r2Estimators:v}))} placeholder="e.g. 8"/></Half>
              <Half><Input label="Application Goal" value={goals.r2Apps} onChange={v=>setGoals(p=>({...p,r2Apps:v}))} placeholder="e.g. 4"/></Half>
            </HalfRow>
            <HalfRow>
              <Half><Input label="Checkout Goal" value={goals.r2Checkouts} onChange={v=>setGoals(p=>({...p,r2Checkouts:v}))} placeholder="e.g. 2"/></Half>
            </HalfRow>
            <div style={{borderTop:`1px solid ${BORDER}`,marginTop:8,paddingTop:14}}>
              <Label>Setup Milestones — Complete by Second Review Call</Label>
              <Check checked={goals.websiteLive} onChange={v=>setGoals(p=>({...p,websiteLive:v}))} label="Cherry added to practice website"/>
              <Check checked={goals.qrIntake} onChange={v=>setGoals(p=>({...p,qrIntake:v}))} label="Cherry QR code added to patient intake forms"/>
              <Check checked={goals.teamTraining} onChange={v=>setGoals(p=>({...p,teamTraining:v}))} label="Front desk team training scheduled"/>
            </div>
          </Card>
          <Card style={{background:"#f8f8f8"}}>
            <H3>Rep Notes & Additional Next Steps</H3>
            <div style={{height:8}}/>
            <Input value={repNotes} onChange={setRepNotes} multiline rows={4} placeholder={"e.g.\n- Send Cherry marketing kit to front desk manager by Friday\n- Team meeting Mondays — good time for Cherry check-ins"}/>
          </Card>
        </>
      );

      // ── STEP 7: SUMMARY PREVIEW ──
      case 7: return (
        <>
          <div style={{marginBottom:8}}><Pill>Summary Ready</Pill></div>
          <H1>Onboarding <span style={{color:G}}>Complete!</span></H1>
          <Body gray>Your summary is ready. Review it below, then download or copy to send to {pName}.</Body>
          <div style={{height:8}}/>
          <Card style={{background:"#f0faf3",border:`1.5px solid ${G}`}}>
            {[
              {label:"Practice",val:pName+(loc?` — ${loc}`:"")},
              {label:"Onboarding Rep",val:repName},
              {label:"Launch Date",val:launchDate||"TBD"},
              {label:"First Review Call",val:review1Date||"TBD"},
              {label:"Second Review Call",val:review2Date||"TBD"},
            ].map((r,i,arr)=>(
              <div key={r.label} style={{display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:i<arr.length-1?`1px solid ${BORDER}`:"none"}}>
                <span style={{fontSize:13,color:TEXTGRAY,fontFamily:font}}>{r.label}</span>
                <span style={{fontSize:13,fontWeight:700,color:DARK,fontFamily:font}}>{r.val}</span>
              </div>
            ))}
          </Card>
          <Btn onClick={()=>setShowSummary(true)} style={{width:"100%",fontSize:16,padding:"16px"}}>View Full Summary & Export</Btn>
        </>
      );
    }
  };

  return (
    <div style={{minHeight:"100vh",background:GRAY,fontFamily:font}}>
      <div style={{background:WHITE,borderBottom:`1px solid ${BORDER}`,padding:"14px 28px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:10}}>
        <Logo/>
        <div style={{fontWeight:700,fontSize:14,color:DARK,fontFamily:font}}>{pName}</div>
      </div>
      <div style={{maxWidth:660,margin:"0 auto",padding:"32px 20px 100px"}}>
        <ProgressBar step={step} total={STEPS}/>
        {stepContent()}
      </div>
      <div style={{position:"fixed",bottom:0,left:0,right:0,background:WHITE,borderTop:`1px solid ${BORDER}`,padding:"14px 28px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <Btn outline onClick={prev} disabled={step===1}>Back</Btn>
        <span style={{fontSize:12,color:TEXTGRAY,fontFamily:font,letterSpacing:"0.02em"}}>{step} / {STEPS}</span>
        <Btn onClick={next} disabled={!canProceed()}>{step===STEPS?"View Summary":"Continue"}</Btn>
      </div>
    </div>
  );
}