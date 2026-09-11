from PIL import Image, ImageDraw, ImageFont
import math, os, subprocess

W, H = 1080, 1920
FPS = 30
DURATION = 14
OUT = "social/elaiva-launch/ELaiVA_launch.mp4"
FRAMES = "/tmp/elaiva_frames"
os.makedirs(FRAMES, exist_ok=True)
os.makedirs(os.path.dirname(OUT), exist_ok=True)

SERIF_B = "/usr/share/fonts/truetype/dejavu/DejaVuSerif-BoldItalic.ttf"
SANS = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
SANS_B = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"

def font(path, size): return ImageFont.truetype(path, size)
def ease(x):
    x=max(0,min(1,x)); return x*x*(3-2*x)
def rr(d, box, r, fill, outline=None, width=1):
    d.rounded_rectangle(box, radius=r, fill=fill, outline=outline, width=width)
def centered(d, text, y, f, fill, spacing=4):
    b=d.multiline_textbbox((0,0),text,font=f,spacing=spacing,align="center")
    d.multiline_text(((W-(b[2]-b[0]))/2,y),text,font=f,fill=fill,spacing=spacing,align="center")

def popup(d,x,y,w,h,title,body,progress):
    rr(d,(x+9,y+12,x+w+9,y+h+12),24,(228,225,220))
    rr(d,(x,y,x+w,y+h),24,(255,255,255),(225,222,216),2)
    d.ellipse((x+22,y+22,x+58,y+58),fill=(25,25,25))
    d.text((x+76,y+18),title,font=font(SANS_B,28),fill=(25,25,25))
    d.text((x+24,y+72),body,font=font(SANS,24),fill=(85,82,78))
    d.rounded_rectangle((x+24,y+h-28,x+w-24,y+h-18),radius=5,fill=(232,229,224))
    d.rounded_rectangle((x+24,y+h-28,x+24+(w-48)*progress,y+h-18),radius=5,fill=(25,25,25))

def draw_browser(d,x,y,w,h,t):
    rr(d,(x+8,y+10,x+w+8,y+h+10),34,(228,225,220))
    rr(d,(x,y,x+w,y+h),34,(255,255,255),(215,211,205),2)
    for i in range(3): d.ellipse((x+26+i*22,y+25,x+40+i*22,y+39),fill=(210,205,199))
    d.rounded_rectangle((x+120,y+18,x+w-30,y+48),radius=15,fill=(246,244,241))
    d.text((x+145,y+22),"elaiva.gr",font=font(SANS,16),fill=(120,116,110))
    d.text((x+38,y+85),"ELåiVA",font=font(SERIF_B,34),fill=(30,30,30))
    d.text((x+40,y+132),"Smart business, made simpler.",font=font(SANS_B,25),fill=(35,35,35))
    d.text((x+40,y+170),"AI solutions • automation • digital support",font=font(SANS,19),fill=(110,106,101))
    cards=[("AI CHAT","24/7","instant replies"),("AUTOMATION","SMART","less manual work"),("WEB","LIVE","built to convert")]
    cy=y+225
    for i,(a,b,c) in enumerate(cards):
        cx=x+35+i*((w-90)/3); cw=(w-115)/3
        rr(d,(cx,cy,cx+cw,cy+145),20,(249,248,245),(230,226,220),1)
        d.text((cx+18,cy+18),a,font=font(SANS_B,16),fill=(105,100,94))
        d.text((cx+18,cy+53),b,font=font(SANS_B,30),fill=(25,25,25))
        d.text((cx+18,cy+100),c,font=font(SANS,15),fill=(120,116,110))
    px=x+35; py=y+410
    rr(d,(px,py,w-70,250),24,(248,247,244),(225,221,215),1)
    d.text((px+22,py+18),"AI ASSISTANT",font=font(SANS_B,18),fill=(45,42,39))
    d.text((px+22,py+55),"How can I help your customer today?",font=font(SANS,21),fill=(90,86,81))
    msg="I can answer, book and guide — automatically."
    chars=min(len(msg),max(0,int((t-5.2)*26)))
    if chars:
        rr(d,(px+22,py+105,px+w-92,py+170),18,(35,35,35))
        d.text((px+38,py+122),msg[:chars],font=font(SANS,17),fill=(255,255,255))

def frame(sec):
    im=Image.new("RGB",(W,H),(248,247,244)); d=ImageDraw.Draw(im)
    for i in range(7):
        cx=W/2+math.sin(sec*.55+i)*360; cy=H/2+math.cos(sec*.43+i*1.7)*620; r=180+50*math.sin(sec+i)
        d.ellipse((cx-r,cy-r,cx+r,cy+r),fill=(236,233,228))
    if sec<2.4:
        p=ease(sec/1.4)
        centered(d,"ELåiVA",540-40*p,font(SERIF_B,116),(24,24,24))
        centered(d,"— T&S COMPANY",675+35*p,font(SANS_B,24),(85,82,78))
        centered(d,"AI solutions for businesses that want to move smarter.",760+55*p,font(SANS,28),(95,91,86))
        if sec>1.25:
            rr(d,(265,850,815,915),32,(30,30,30)); centered(d,"THIS IS ELåiVA",866,font(SANS_B,22),(255,255,255))
    elif sec<5:
        centered(d,"WHAT IF YOUR BUSINESS\nCOULD DO MORE?",250,font(SANS_B,64),(25,25,25),10)
        items=[("REPLY","instantly"),("BOOK","automatically"),("SUPPORT","24/7"),("GROW","smarter")]
        for i,(a,b) in enumerate(items):
            yy=620+i*185; start=max(0,min(1,(sec-(2.4+i*.22))/.55)); xx=110+int(900*ease(start))
            rr(d,(xx,yy,xx+760,yy+120),28,(255,255,255),(225,221,215),2)
            d.text((xx+30,yy+22),a,font=font(SANS_B,32),fill=(25,25,25)); d.text((xx+30,yy+68),b,font=font(SANS,22),fill=(105,101,96)); d.ellipse((xx+680,yy+38,xx+714,yy+72),fill=(25,25,25))
    elif sec<8.8:
        centered(d,"A REAL DIGITAL EXPERIENCE.\nNOT JUST A WEBSITE.",155,font(SANS_B,48),(25,25,25),8)
        draw_browser(d,90,430,900,970,sec)
        if sec>6: popup(d,95,1460,890,210,"NEW CUSTOMER","Can you help me choose the right service?",min(1,(sec-6)/1.8))
    elif sec<11.6:
        centered(d,"WHILE YOU WORK…",190,font(SANS_B,54),(25,25,25)); centered(d,"ELåiVA CAN KEEP THINGS MOVING.",275,font(SANS,30),(90,86,81))
        nodes=[("CUSTOMER",270,"asks"),("AI",570,"understands"),("ACTION",870,"books / replies / routes")]
        for i,(label,x,sub) in enumerate(nodes):
            yy=780; rr(d,(x-125,yy,x+125,yy+150),30,(255,255,255),(220,216,210),2)
            d.text((x-75,yy+32),label,font=font(SANS_B,22),fill=(25,25,25)); b=d.textbbox((0,0),sub,font=font(SANS,17)); d.text((x-(b[2]-b[0])/2,yy+86),sub,font=font(SANS,17),fill=(105,101,96))
            if i<2:
                d.line((x+125,yy+75,x+195,yy+75),fill=(25,25,25),width=4); dx=x+125+min(70,max(0,(sec*90+i*35)%70)); d.ellipse((dx-7,yy+68,dx+7,yy+82),fill=(25,25,25))
        popup(d,140,1110,800,250,"AUTOMATION COMPLETE","Another task handled without interrupting you.",min(1,max(0,(sec-9)/1.5)))
    else:
        centered(d,"BUILD SMARTER.\nSTART WITH ELåiVA.",330,font(SANS_B,66),(24,24,24),10); centered(d,"Websites • AI chatbots • automation • smart support",570,font(SANS,27),(90,86,81))
        rr(d,(185,760,895,860),40,(25,25,25)); centered(d,"ELåiVA.GR",786,font(SANS_B,32),(255,255,255)); centered(d,"— T&S COMPANY",960,font(SERIF_B,36),(35,35,35)); centered(d,"Your next digital move starts here.",1045,font(SANS,25),(100,96,91))
        popup(d,120,1240,840,190,"SYSTEM READY","Your business is ready for smarter tools.",1); centered(d,"FOLLOW @ELåiVA",1515,font(SANS_B,24),(25,25,25)); centered(d,"AI • DIGITAL • AUTOMATION",1570,font(SANS,19),(110,106,101))
    noise=Image.effect_noise((W,H),18).convert("L").point(lambda p:int(p*.08)); grain=Image.merge("RGB",(noise,noise,noise)); return Image.blend(im,grain,.08)

for n in range(DURATION*FPS): frame(n/FPS).save(f"{FRAMES}/frame_{n:04d}.jpg",quality=92,optimize=True)
subprocess.run(["ffmpeg","-y","-framerate",str(FPS),"-i",f"{FRAMES}/frame_%04d.jpg","-c:v","libx264","-preset","medium","-crf","18","-pix_fmt","yuv420p","-movflags","+faststart",OUT],check=True)
print(OUT)
