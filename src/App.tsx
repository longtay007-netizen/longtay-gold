/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { useRef, useState } from 'react';
import { Swords, Anchor, Flag, History, ChevronDown, Quote, X, ExternalLink } from 'lucide-react';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-sepia-accent origin-left z-[60]"
      style={{ scaleX }}
    />
  );
};

// --- Custom Components ---

const DetailView = ({ item, onClose }: { item: any, onClose: () => void }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md"
    onClick={onClose}
  >
    <motion.div 
      initial={{ scale: 0.9, y: 50, rotate: -2 }}
      animate={{ scale: 1, y: 0, rotate: 0 }}
      exit={{ scale: 0.9, y: 50, rotate: 2 }}
      className="paper-sheet relative max-w-2xl w-full p-10 md:p-16 border-2 border-sepia-accent/30 text-sepia-dark"
      onClick={e => e.stopPropagation()}
    >
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 p-2 hover:bg-sepia-accent/10 rounded-full transition-colors"
      >
        <X size={24} />
      </button>

      <span className="text-[0.65rem] uppercase tracking-[0.4em] font-bold text-sepia-accent mb-6 block">Sử liệu chi tiết</span>
      <h3 className="text-4xl md:text-5xl font-black uppercase text-sepia-dark leading-tight mb-8">
        {item.title}
      </h3>
      
      <div className="space-y-6 text-lg font-serif leading-relaxed italic border-l-2 border-sepia-accent/40 pl-6">
        <p>{item.fullContent || item.content}</p>
        <p className="not-italic text-base font-sans font-medium opacity-80">
          Thời gian: <span className="text-sepia-accent font-bold underline decoration-sepia-accent/30">{item.date}</span>
        </p>
      </div>

      <div className="mt-12 flex justify-between items-center border-t border-sepia-accent/20 pt-8">
        <div className="flex gap-4">
          <History size={32} className="opacity-20 translate-y-1" />
          <p className="text-xs uppercase tracking-tighter opacity-40 max-w-[200px]">Di sản được lưu trữ tại bảo tàng lịch sử quốc gia</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-sepia-dark text-white rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-sepia-accent hover:text-sepia-dark transition-all shadow-xl">
          Tài liệu gốc <ExternalLink size={14} />
        </button>
      </div>
    </motion.div>
  </motion.div>
);

const ParallaxHeader = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <header className="relative h-screen flex items-center justify-center overflow-hidden bg-sepia-dark border-b border-sepia-accent/20">
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 z-0 opacity-30"
      >
        <img 
          src="https://images.unsplash.com/photo-1598371307613-2d2c77d07945?auto=format&fit=crop&q=80&w=2000" 
          alt="Bạch Đằng River Ancient Map" 
          className="w-full h-full object-cover mix-blend-luminosity brightness-75"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-sepia-dark z-1" />
      
      <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] border border-sepia-accent/5 rounded-full z-[2] animate-pulse" />
      <div className="absolute top-[-50px] right-[-50px] w-[250px] h-[250px] border border-sepia-accent/10 rounded-full z-[2]" />

      <motion.div 
        style={{ opacity }}
        className="relative z-10 text-center px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <motion.span 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="text-sepia-accent font-sans text-xs md:text-sm uppercase tracking-[0.6em] font-semibold mb-8 block"
        >
          Hồn thiêng sông núi
        </motion.span>
        <h1 className="text-7xl md:text-[8rem] lg:text-[11rem] font-black text-white mb-8 uppercase leading-[0.85] text-shadow-bold tracking-tighter">
          Hào Khí<br/>Việt
        </h1>
        <p className="text-sepia-light/60 font-serif italic text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed mt-4">
          "Dân ta phải biết sử ta, cho tường gốc tích nước nhà Việt Nam."
        </p>
        <div className="mt-12 flex flex-col items-center gap-6">
          <a 
            href="#main-content"
            className="bg-sepia-accent text-sepia-dark font-black py-5 px-12 uppercase tracking-[0.2em] text-xs hover:scale-105 active:scale-95 transition-all shadow-[0_10px_40px_rgba(197,160,89,0.3)]"
          >
            Khám phá sử liệu
          </a>
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
          >
            <ChevronDown className="text-sepia-accent opacity-30" size={32} />
          </motion.div>
        </div>
      </motion.div>
    </header>
  );
};

const SectionBạchĐằng = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section ref={ref} id="bach-dang" className="py-32 px-6 md:px-12 bg-sepia-dark relative overflow-hidden border-b border-sepia-accent/10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-8 text-sepia-accent">
            <Anchor size={20} className="animate-spin-slow" />
            <span className="font-sans uppercase tracking-[0.4em] text-[0.6rem] font-bold">Chiến tích nghìn thu • 1288</span>
          </div>
          <h2 className="text-6xl md:text-8xl mb-12 leading-[0.9] font-black uppercase text-white tracking-tighter">Sông<br/><span className="text-sepia-accent">Bạch Đằng</span></h2>
          <div className="space-y-10 text-xl leading-loose text-sepia-light/70 font-serif border-l-4 border-sepia-accent/20 pl-10 italic">
            <p className="first-letter:text-5xl first-letter:float-left first-letter:mr-3 first-letter:text-sepia-accent first-letter:font-display">
              Trận Bạch Đằng năm 1288 là chiến thắng vĩ đại của quân dân nhà Trần trước đội quân Nguyên Mông hùng mạnh nhất thế giới thời bấy giờ.
            </p>
            <p>
              Với nghệ thuật quân sự độc đáo, Hưng Đạo Vương đã biến thủy triều thành đồng minh, bãi cọc thành mồ chôn kẻ thù.
            </p>
          </div>
        </motion.div>
        
        <motion.div 
          style={{ y }}
          className="relative aspect-[4/5] rounded-sm overflow-hidden shadow-2xl border border-sepia-accent/30 group"
        >
          <img 
            src="https://images.unsplash.com/photo-1549675584-91f19337af3d?auto=format&fit=crop&q=80&w=1000" 
            alt="Ancient Warship Concept" 
            className="w-full h-full object-cover grayscale brightness-50 group-hover:scale-110 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-sepia-accent/5 mix-blend-color hover:bg-transparent transition-all duration-700" />
          <div className="absolute top-6 left-6 p-4 border border-sepia-accent/40 backdrop-blur-sm">
             <span className="text-[0.6rem] uppercase tracking-widest text-white font-bold">Minh họa phục dựng</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const SectionĐiệnBiênPhủ = ({ onOpenDetail }: { onOpenDetail: (item: any) => void }) => {
  const data = [
    { 
      title: "Kế hoạch Nava", 
      content: "Pháp xây dựng Điện Biên Phủ thành 'pháo đài bất khả xâm phạm' tại Đông Dương.", 
      fullContent: "Đại tướng Navarre tin rằng việc tập trung quân đội tinh nhuệ tại thung lũng Điện Biên Phủ sẽ nhử được chủ lực quân đội Việt Minh vào một trận quyết chiến quy ước để tiêu diệt. Đây là sai lầm chiến thuật lớn nhất của thực dân Pháp.",
      date: "Tháng 11/1953" 
    },
    { 
      title: "56 Ngày Đêm", 
      content: "Quân dân ta khoét núi, ngủ hầm, mưa dầm, cơm vắt, máu trộn bùn non.", 
      fullContent: "Chiến sĩ ta đã thực hiện một kỳ tích vượt xa trí tưởng tượng của phương Tây: kéo pháo lên đỉnh núi cao, đào hệ thống giao thông hào chằng chịt vây lấn từng cứ điểm, thắt nghẹt cổ họng tiếp tế của địch.",
      date: "13/03 — 07/05/1954" 
    },
    { 
      title: "Toàn Thắng", 
      content: "Lá cờ Quyết chiến Quyết thắng tung bay trên nóc hầm tướng De Castries.", 
      fullContent: "Chiều ngày 7 tháng 5, quân ta đồng loạt tấn công trung tâm mường Thanh. Tướng De Castries cùng toàn bộ bộ tham mưu bị bắt sống. Tiếng súng ngừng nổ, thung lũng Điện Biên Phủ rực rỡ sắc cờ đỏ sao vàng.",
      date: "17:30 ngày 07/05/1954" 
    }
  ];

  return (
    <section id="dien-bien-phu" className="py-32 bg-sepia-dark border-b border-sepia-accent/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-baseline gap-6 mb-24">
          <h2 className="text-6xl md:text-8xl font-black uppercase text-white tracking-tighter m-0">Điện Biên Phủ</h2>
          <div className="h-1 lg:h-1.5 flex-grow bg-sepia-accent/20" />
          <Flag className="text-sepia-accent opacity-40 mb-[-10px]" size={40} />
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {data.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-12 bg-white/5 border border-sepia-accent/10 hover:border-sepia-accent/50 transition-all duration-700 shadow-2xl flex flex-col justify-between group cursor-pointer"
              onClick={() => onOpenDetail(item)}
            >
              <div>
                <span className="text-sepia-accent font-sans uppercase tracking-[0.4em] text-[0.6rem] font-bold block mb-10 translate-x-[-10px]">Giai đoạn 0{i+1}</span>
                <h4 className="text-3xl mb-8 font-display italic text-white group-hover:text-sepia-accent transition-colors">{item.title}</h4>
                <p className="text-sepia-light/60 leading-relaxed font-serif text-lg italic">{item.content}</p>
              </div>
              <div className="mt-16 flex justify-between items-center opacity-40 group-hover:opacity-100 transition-all">
                <span className="text-[0.6rem] uppercase tracking-widest font-bold text-white">{item.date}</span>
                <button className="text-sepia-accent flex items-center gap-2 text-[0.6rem] uppercase font-bold tracking-widest">
                  Ấn để xem sử liệu <ExternalLink size={10} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-8 bg-gradient-to-b from-sepia-dark to-transparent backdrop-blur-none">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-sepia-accent flex items-center justify-center rotate-3 hover:rotate-0 transition-transform shadow-xl">
          <History className="text-sepia-dark" size={28} />
        </div>
        <div className="flex flex-col">
          <span className="text-white font-display uppercase tracking-[0.4em] text-sm font-black italic">Hào Khí</span>
          <span className="text-[0.55rem] uppercase tracking-widest text-sepia-accent font-bold">Lịch Sử Việt Nam</span>
        </div>
      </div>
      <div className="hidden lg:flex gap-12 text-sepia-light/50 font-sans text-[0.65rem] uppercase tracking-[0.4em] font-bold">
        <a href="#bach-dang" className="hover:text-sepia-accent transition-colors relative group">
          Bạch Đằng
          <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-sepia-accent group-hover:w-full transition-all" />
        </a>
        <a href="#stats" className="hover:text-sepia-accent transition-colors relative group">
          Tương Quan
          <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-sepia-accent group-hover:w-full transition-all" />
        </a>
        <a href="#dien-bien-phu" className="hover:text-sepia-accent transition-colors relative group">
          Điện Biên Phủ
          <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-sepia-accent group-hover:w-full transition-all" />
        </a>
      </div>
      <a 
        href="#footer"
        className="px-8 py-3 bg-white/5 border border-sepia-accent/20 text-white rounded-sm text-[0.6rem] uppercase tracking-[0.3em] font-black hover:bg-sepia-accent hover:text-sepia-dark transition-all"
      >
        Liên hệ
      </a>
    </nav>
  );
};

const InfographicStats = () => {
  const stats = [
    { label: "Quân Nguyên Mông", value: 600, suffix: "k", color: "bg-sepia-accent", desc: "Đội quân thiện chiến bật nhất lục địa Á-Âu." },
    { label: "Quân Nhà Trần", value: 400, suffix: "k", color: "bg-white", desc: "Sức mạnh từ sự đoàn kết toàn dân tộc." }
  ];

  return (
    <section id="stats" className="py-40 sepia-gradient text-sepia-light border-y border-sepia-accent/20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-10">
          <div>
            <span className="text-sepia-accent text-xs font-bold uppercase tracking-[0.5em] mb-4 block">Thống kê dữ liệu</span>
            <h3 className="text-5xl md:text-7xl uppercase font-black tracking-tighter leading-none m-0">Tương quan<br/><span className="text-sepia-accent italic font-serif lowercase">lực lượng</span></h3>
          </div>
          <Swords className="text-sepia-accent opacity-20" size={100} />
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-card bg-white/[0.03] border border-sepia-accent/10 p-12 relative group overflow-hidden">
              <div className="flex justify-between items-start mb-8">
                <div className="space-y-2">
                  <h4 className="text-2xl font-display font-black text-white italic">{stat.label}</h4>
                  <p className="text-xs uppercase tracking-widest text-sepia-light/40">{stat.desc}</p>
                </div>
                <div className="text-5xl font-black text-sepia-accent font-display">
                  {stat.value}{stat.suffix}
                </div>
              </div>
              <div className="h-[2px] bg-white/5 w-full mb-8 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 2.5, ease: "easeInOut" }}
                  className={`h-full ${stat.color} opacity-60 shadow-[0_0_20px_white]`}
                />
              </div>
              <div className="absolute bottom-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                 <Flag size={60} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function App() {
  const [selectedDetail, setSelectedDetail] = useState<any>(null);

  return (
    <div className="overflow-x-hidden selection:bg-sepia-accent selection:text-sepia-dark">
      <ScrollProgress />
      <Navbar />
      <ParallaxHeader />
      
      <main id="main-content" className="relative z-10 bg-sepia-dark shadow-[0_-100px_200px_rgba(0,0,0,0.8)]">
        <SectionBạchĐằng />
        <InfographicStats />
        <SectionĐiệnBiênPhủ onOpenDetail={(item) => setSelectedDetail(item)} />
        
        {/* Quote Section simplified and refined */}
        <section className="py-48 bg-sepia-dark flex items-center justify-center text-center px-6 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-sepia-accent/[0.02] rounded-full blur-[120px]" />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="max-w-4xl px-12 py-20 relative z-10 border-y-2 border-sepia-accent/20"
          >
            <Quote className="absolute -top-8 left-1/2 -translate-x-1/2 text-sepia-accent bg-sepia-dark px-4" size={60} />
            <p className="text-4xl md:text-6xl font-serif italic leading-tight text-white mb-12">
              "Sự đoàn kết vốn là sức mạnh vô địch của dân tộc Việt Nam."
            </p>
            <span className="text-sepia-accent font-sans uppercase tracking-[0.5em] text-[0.65rem] font-black">Hùng khí nghìn năm</span>
          </motion.div>
        </section>
      </main>

      <footer id="footer" className="py-24 bg-[#0d0b0a] text-sepia-light px-6 text-center border-t border-sepia-accent/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-16">
          <div className="flex items-center gap-4 text-left">
            <History className="text-sepia-accent scale-125" size={32} />
            <div>
              <span className="font-display uppercase tracking-[0.4em] text-sm block text-white font-black italic">Hào Khí Việt Nam</span>
              <span className="text-[0.6rem] uppercase tracking-[0.2em] text-sepia-accent font-bold">Dân tộc bất khuất</span>
            </div>
          </div>
          <p className="text-[0.75rem] text-sepia-light/30 italic font-serif max-w-sm leading-loose">
            Trang web được thực hiện nhằm tôn vinh các anh hùng liệt sĩ và những giá trị lịch sử cao quý của dân tộc Việt Nam. 
            Mọi hình ảnh và sử liệu đều nhằm mục đích giáo dục và truyền cảm hứng.
          </p>
          <div className="flex gap-10">
             <Swords className="text-sepia-accent/20 hover:text-sepia-accent cursor-pointer transition-colors" size={24} />
             <Flag className="text-sepia-accent/20 hover:text-sepia-accent cursor-pointer transition-colors" size={24} />
             <Anchor className="text-sepia-accent/20 hover:text-sepia-accent cursor-pointer transition-colors" size={24} />
          </div>
        </div>
      </footer>

      {/* Details Overlay and creative transitions */}
      <AnimatePresence>
        {selectedDetail && (
          <DetailView item={selectedDetail} onClose={() => setSelectedDetail(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
