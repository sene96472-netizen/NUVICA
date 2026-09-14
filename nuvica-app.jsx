import React, { useState } from "react";
import {
  Home, Search, Plus, Film, User, Heart, MessageCircle, Send,
  Bookmark, MoreHorizontal, Play, Music, Repeat, Bell, Settings,
  ArrowLeft, Coffee, X, Lock, Sparkles, Radio, LayoutGrid
} from "lucide-react";

// ---------- Mock data ----------

const PULSE = [
  { id: 1, name: "toi", initials: "+", color: "linear-gradient(135deg,#1B2330,#0A0E14)", isSelf: true },
  { id: 2, name: "lina.k", initials: "LK", color: "linear-gradient(135deg,#00E6A8,#FF3D7F)", live: true },
  { id: 3, name: "sam_r", initials: "SR", color: "linear-gradient(135deg,#FFB800,#FF3D7F)" },
  { id: 4, name: "noa.mts", initials: "NM", color: "linear-gradient(135deg,#00E6A8,#3D8BFF)" },
  { id: 5, name: "cercle", initials: "CP", color: "linear-gradient(135deg,#3D8BFF,#00E6A8)", close: true },
  { id: 6, name: "ilyes", initials: "IL", color: "linear-gradient(135deg,#FF3D7F,#FFB800)" },
];

const FEED = [
  { id: 1, user: "lina.k", initials: "LK", color: "linear-gradient(135deg,#00E6A8,#FF3D7F)", time: "2 h", caption: "Golden hour sur les toits, encore une fois. Je ne m'en lasse pas.", likes: 4210, comments: 128, isVideo: false, mode: "suivi", media: "linear-gradient(160deg,#0f2027,#2c5364,#00E6A8)", h: 1.35 },
  { id: 2, user: "sam_r", initials: "SR", color: "linear-gradient(135deg,#FFB800,#FF3D7F)", time: "4 h", caption: "Session skate d'hier — le dernier trick vaut le détour.", likes: 18900, comments: 512, isVideo: true, mode: "decouverte", media: "linear-gradient(160deg,#1a1a2e,#4b3f72,#FF3D7F)", h: 1 },
  { id: 3, user: "noa.mts", initials: "NM", color: "linear-gradient(135deg,#00E6A8,#3D8BFF)", time: "6 h", caption: "Pâtes à la truffe en 12 minutes chrono.", likes: 2870, comments: 94, isVideo: false, mode: "suivi", media: "linear-gradient(160deg,#0f2027,#203a43,#3D8BFF)", h: 0.9 },
  { id: 4, user: "maya_d", initials: "MD", color: "linear-gradient(135deg,#3D8BFF,#00E6A8)", time: "9 h", caption: "3 étirements pour un dos qui te remerciera.", likes: 9640, comments: 231, isVideo: true, mode: "decouverte", media: "linear-gradient(160deg,#0b1224,#3b2f5e,#00E6A8)", h: 1.5 },
  { id: 5, user: "ilyes", initials: "IL", color: "linear-gradient(135deg,#FF3D7F,#FFB800)", time: "12 h", caption: "Carnet de voyage — jour 4, quelque part dans l'Atlas.", likes: 5320, comments: 176, isVideo: false, mode: "suivi", media: "linear-gradient(160deg,#134e5e,#71b280,#FFB800)", h: 1.15 },
  { id: 6, user: "maya_d", initials: "MD", color: "linear-gradient(135deg,#3D8BFF,#00E6A8)", time: "1 j", caption: "Ma table de travail ce matin.", likes: 1120, comments: 41, isVideo: false, mode: "decouverte", media: "linear-gradient(160deg,#1a1a2e,#2c5364,#3D8BFF)", h: 0.75 },
];

const REELS = [
  { id: 1, user: "sam_r", initials: "SR", caption: "Le dernier trick a demandé 40 essais. Ça valait le coup.", music: "Son original — sam_r", likes: "18,9 k", comments: "512", remix: "1,2 k", media: "linear-gradient(200deg,#1a1a2e,#4b3f72,#FF3D7F)" },
  { id: 2, user: "maya_d", initials: "MD", caption: "3 étirements, 90 secondes, zéro excuse.", music: "Piano lo-fi — Studio Atlas", likes: "9,6 k", comments: "231", remix: "804", media: "linear-gradient(200deg,#0b1224,#3b2f5e,#00E6A8)" },
  { id: 3, user: "noa.mts", initials: "NM", caption: "Truffe + pâtes + 12 min = dimanche parfait.", music: "Son original — noa.mts", likes: "2,9 k", comments: "94", remix: "212", media: "linear-gradient(200deg,#0f2027,#203a43,#3D8BFF)" },
];

const COLLECTIONS = [
  { id: 1, name: "Recettes", count: 24, color: "linear-gradient(135deg,#FFB800,#FF3D7F)" },
  { id: 2, name: "Voyages", count: 41, color: "linear-gradient(135deg,#3D8BFF,#00E6A8)" },
  { id: 3, name: "Fitness", count: 12, color: "linear-gradient(135deg,#00E6A8,#3D8BFF)" },
  { id: 4, name: "Idées déco", count: 8, color: "linear-gradient(135deg,#FF3D7F,#FFB800)" },
];

const PROFILE_TILES = [
  { id: 0, isVideo: false, h: 1.2, media: "linear-gradient(160deg,#0f2027,#2c5364,#00E6A8)" },
  { id: 1, isVideo: true, h: 0.85, media: "linear-gradient(160deg,#1a1a2e,#4b3f72,#FF3D7F)" },
  { id: 2, isVideo: false, h: 1, media: "linear-gradient(160deg,#0b1224,#3b2f5e,#3D8BFF)" },
  { id: 3, isVideo: false, h: 1.4, media: "linear-gradient(160deg,#134e5e,#71b280,#FFB800)" },
  { id: 4, isVideo: true, h: 0.95, media: "linear-gradient(160deg,#1a1a2e,#2c5364,#3D8BFF)" },
  { id: 5, isVideo: false, h: 1.1, media: "linear-gradient(160deg,#0f2027,#203a43,#FF3D7F)" },
];

function fmt(n) {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(".", ",") + " k";
  return String(n);
}

// ---------- Small building blocks ----------

function Avatar({ initials, color, size = 36, radius = "50%" }) {
  return (
    <div className="nv-avatar" style={{ background: color, width: size, height: size, fontSize: size * 0.36, borderRadius: radius }}>
      {initials}
    </div>
  );
}

function Segmented({ value, onChange }) {
  return (
    <div className="nv-segmented">
      <button className={value === "suivi" ? "active" : ""} onClick={() => onChange("suivi")}>Suivi</button>
      <button className={value === "decouverte" ? "active" : ""} onClick={() => onChange("decouverte")}>Découverte</button>
    </div>
  );
}

function WellbeingCard({ onDismiss }) {
  return (
    <div className="nv-wellbeing">
      <div className="nv-wellbeing-icon"><Coffee size={18} /></div>
      <div className="nv-wellbeing-text">
        <p className="nv-wellbeing-title">Tu défiles depuis un moment</p>
        <p className="nv-wellbeing-sub">NUVICA n'ajuste jamais son fil pour te retenir plus longtemps. Une pause ?</p>
      </div>
      <button className="nv-wellbeing-close" onClick={onDismiss}><X size={16} /></button>
    </div>
  );
}

// ---------- Screens ----------

function HomeScreen({ mode, setMode, showWellbeing, dismissWellbeing, onOpenPost }) {
  const ordered = mode === "suivi"
    ? FEED.filter(p => p.mode === "suivi").concat(FEED.filter(p => p.mode !== "suivi"))
    : FEED.filter(p => p.mode === "decouverte").concat(FEED.filter(p => p.mode !== "decouverte"));

  return (
    <div className="nv-screen">
      <div className="nv-topbar">
        <span className="nv-logo">NUVICA</span>
        <div className="nv-topbar-icons">
          <Bell size={19} />
          <Settings size={19} />
        </div>
      </div>
      <Segmented value={mode} onChange={setMode} />
      <div className="nv-pulse">
        {PULSE.map(s => (
          <button className="nv-pulse-chip" key={s.id}>
            <div className={"nv-pulse-avatar" + (s.close ? " close" : "")} style={{ background: s.color }}>
              {s.initials}
              {s.live && <span className="nv-live-dot" />}
            </div>
            <span>{s.name}</span>
          </button>
        ))}
      </div>

      {showWellbeing && <WellbeingCard onDismiss={dismissWellbeing} />}

      <div className="nv-masonry">
        {ordered.map(post => (
          <button className="nv-tile" key={post.id} style={{ background: post.media, aspectRatio: `1 / ${post.h}` }} onClick={() => onOpenPost(post)}>
            {post.isVideo && <span className="nv-tile-play"><Play size={12} fill="white" /></span>}
            <div className="nv-tile-footer">
              <Avatar initials={post.initials} color={post.color} size={22} radius="8px" />
              <span className="nv-tile-user">{post.user}</span>
              <span className="nv-tile-likes"><Heart size={11} fill="white" /> {fmt(post.likes)}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function PostDetail({ post, liked, saved, onLike, onSave, onBack }) {
  return (
    <div className="nv-screen nv-detail">
      <div className="nv-detail-topbar">
        <button className="nv-icon-btn" onClick={onBack}><ArrowLeft size={20} /></button>
        <span className="nv-screen-title">Publication</span>
        <MoreHorizontal size={19} />
      </div>
      <div className="nv-detail-media" style={{ background: post.media }}>
        {post.isVideo && <div className="nv-play-badge"><Play size={16} fill="white" /></div>}
      </div>
      <div className="nv-post-head">
        <Avatar initials={post.initials} color={post.color} radius="10px" />
        <div className="nv-post-headtext">
          <span className="nv-username">{post.user}</span>
          <span className="nv-time">{post.time}</span>
        </div>
      </div>
      <div className="nv-post-actions">
        <div className="nv-post-actions-left">
          <button className="nv-icon-btn" onClick={onLike}>
            <Heart size={22} fill={liked ? "#FF3D7F" : "none"} color={liked ? "#FF3D7F" : "var(--nv-text)"} />
          </button>
          <button className="nv-icon-btn"><MessageCircle size={22} /></button>
          <button className="nv-icon-btn"><Send size={22} /></button>
        </div>
        <button className="nv-icon-btn" onClick={onSave}>
          <Bookmark size={22} fill={saved ? "#FFB800" : "none"} color={saved ? "#FFB800" : "var(--nv-text)"} />
        </button>
      </div>
      <div className="nv-post-body">
        <p className="nv-likes">{fmt(post.likes + (liked ? 1 : 0))} mentions J'aime</p>
        <p className="nv-caption"><span className="nv-username">{post.user}</span> {post.caption}</p>
        <p className="nv-comments-link">Voir les {post.comments} commentaires</p>
      </div>
    </div>
  );
}

function DiscoverScreen({ showTip, dismissTip }) {
  return (
    <div className="nv-screen nv-discover">
      {showTip && (
        <div className="nv-tip">
          <Sparkles size={14} />
          <span>Nouveau : le bouton Remix, pour reprendre un son ou une scène dans ta propre vidéo.</span>
          <button onClick={dismissTip}><X size={14} /></button>
        </div>
      )}
      <div className="nv-reels-rail">
        {REELS.map(reel => (
          <div className="nv-reel" style={{ background: reel.media }} key={reel.id}>
            <div className="nv-reel-topbar">
              <span>Découverte</span>
              <Search size={18} />
            </div>
            <div className="nv-reel-center"><Play size={40} color="rgba(255,255,255,0.85)" /></div>
            <div className="nv-reel-rail-actions">
              <Avatar initials={reel.initials} color="linear-gradient(135deg,#00E6A8,#FF3D7F)" size={40} radius="12px" />
              <button className="nv-reel-action"><Heart size={26} /><span>{reel.likes}</span></button>
              <button className="nv-reel-action"><MessageCircle size={26} /><span>{reel.comments}</span></button>
              <button className="nv-reel-action"><Repeat size={26} /><span>{reel.remix}</span></button>
              <button className="nv-reel-action"><Bookmark size={26} /></button>
            </div>
            <div className="nv-reel-bottom">
              <p className="nv-username">@{reel.user}</p>
              <p className="nv-reel-caption">{reel.caption}</p>
              <p className="nv-reel-music"><Music size={13} /> {reel.music}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CreateScreen() {
  return (
    <div className="nv-screen nv-create">
      <div className="nv-topbar"><span className="nv-screen-title">Créer</span></div>
      <div className="nv-create-options">
        <button className="nv-create-card">
          <LayoutGrid size={22} />
          <span>Photo ou carrousel</span>
          <small>Jusqu'à 10 visuels, avec ou sans légende</small>
        </button>
        <button className="nv-create-card highlight">
          <Film size={22} />
          <span>Vidéo courte</span>
          <small>Filme, monte, ajoute un son — publiée dans ton mur et en Découverte</small>
        </button>
        <button className="nv-create-card">
          <Radio size={22} />
          <span>Live</span>
          <small>Diffuse en direct auprès de tes abonnés</small>
        </button>
      </div>
      <div className="nv-create-note">
        <Sparkles size={16} />
        <p>Un seul post, deux formats. NUVICA génère automatiquement l'aperçu de tes vidéos pour ton mur — plus besoin de choisir entre publier une photo ou une vidéo.</p>
      </div>
    </div>
  );
}

function InboxScreen() {
  const threads = [
    { name: "lina.k", initials: "LK", color: "linear-gradient(135deg,#00E6A8,#FF3D7F)", preview: "on part à quelle heure demain ?", time: "3 min" },
    { name: "sam_r", initials: "SR", color: "linear-gradient(135deg,#FFB800,#FF3D7F)", preview: "a envoyé un reel", time: "1 h" },
    { name: "noa.mts", initials: "NM", color: "linear-gradient(135deg,#00E6A8,#3D8BFF)", preview: "merci pour la recette", time: "5 h" },
  ];
  return (
    <div className="nv-screen">
      <div className="nv-topbar"><span className="nv-screen-title">Messages</span></div>
      <div className="nv-broadcast">
        <Radio size={18} />
        <div>
          <p className="nv-broadcast-title">Diffusions</p>
          <p className="nv-broadcast-sub">Reçois des messages directement des créateurs que tu suis, sans les suivre en retour</p>
        </div>
      </div>
      <div className="nv-threads">
        {threads.map(t => (
          <div className="nv-thread" key={t.name}>
            <Avatar initials={t.initials} color={t.color} size={44} radius="12px" />
            <div className="nv-thread-text">
              <span className="nv-username">{t.name}</span>
              <span className="nv-thread-preview">{t.preview}</span>
            </div>
            <span className="nv-time">{t.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileScreen() {
  const [tab, setTab] = useState("grid");
  return (
    <div className="nv-screen">
      <div className="nv-topbar">
        <span className="nv-screen-title">@toi.sur.nuvica</span>
        <Settings size={19} />
      </div>
      <div className="nv-profile-head">
        <Avatar initials="TU" color="linear-gradient(135deg,#00E6A8,#3D8BFF)" size={68} radius="18px" />
        <div>
          <p className="nv-profile-name">Toi, sur NUVICA</p>
          <p className="nv-profile-bio">Un pied dans la photo, un pied dans la vidéo. Paris.</p>
        </div>
      </div>
      <div className="nv-stat-pills">
        <div className="nv-stat-pill"><strong>128</strong><span>publications</span></div>
        <div className="nv-stat-pill"><strong>4,2 k</strong><span>abonnés</span></div>
        <div className="nv-stat-pill"><strong>318</strong><span>abonnements</span></div>
      </div>
      <div className="nv-profile-buttons">
        <button className="nv-btn-secondary">Modifier le profil</button>
        <button className="nv-btn-secondary">Partager</button>
      </div>
      <div className="nv-profile-tabs">
        <button className={tab === "grid" ? "active" : ""} onClick={() => setTab("grid")}>Mur</button>
        <button className={tab === "reels" ? "active" : ""} onClick={() => setTab("reels")}>Vidéos</button>
        <button className={tab === "saved" ? "active" : ""} onClick={() => setTab("saved")}>Collections</button>
      </div>
      {tab !== "saved" ? (
        <div className="nv-masonry nv-masonry-profile">
          {PROFILE_TILES.filter(g => tab === "grid" ? true : g.isVideo).map(g => (
            <div className="nv-tile" style={{ background: g.media, aspectRatio: `1 / ${g.h}` }} key={g.id}>
              {g.isVideo && <span className="nv-tile-play"><Play size={12} fill="white" /></span>}
            </div>
          ))}
        </div>
      ) : (
        <div className="nv-collections">
          {COLLECTIONS.map(c => (
            <div className="nv-collection" key={c.id}>
              <div className="nv-collection-cover" style={{ background: c.color }}><Lock size={14} /></div>
              <span className="nv-collection-name">{c.name}</span>
              <span className="nv-collection-count">{c.count} éléments</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------- App shell ----------

export default function App() {
  const [tab, setTab] = useState("home");
  const [mode, setMode] = useState("suivi");
  const [liked, setLiked] = useState({});
  const [saved, setSaved] = useState({});
  const [showWellbeing, setShowWellbeing] = useState(true);
  const [showTip, setShowTip] = useState(true);
  const [openPost, setOpenPost] = useState(null);

  const toggleLike = (id) => setLiked(s => ({ ...s, [id]: !s[id] }));
  const toggleSave = (id) => setSaved(s => ({ ...s, [id]: !s[id] }));

  const NAV = [
    { id: "home", icon: Home },
    { id: "discover", icon: Search },
    { id: "create", icon: Plus, isFab: true },
    { id: "inbox", icon: MessageCircle },
    { id: "profile", icon: User },
  ];

  return (
    <div className="nv-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@500;700;800&family=Manrope:wght@400;500;600;700&display=swap');

        .nv-root {
          --nv-void: #0A0E14;
          --nv-elevated: #131924;
          --nv-elevated-2: #1B2330;
          --nv-mint: #00E6A8;
          --nv-pink: #FF3D7F;
          --nv-amber: #FFB800;
          --nv-blue: #3D8BFF;
          --nv-text: #F2F5F7;
          --nv-muted: #7E8898;
          --nv-border: #212938;
          font-family: 'Manrope', sans-serif;
          display: flex;
          justify-content: center;
          padding: 28px 12px;
          background: radial-gradient(circle at 50% 0%, #101724 0%, #050709 65%);
          min-height: 100vh;
          box-sizing: border-box;
        }
        .nv-root * { box-sizing: border-box; }
        .nv-phone {
          width: 390px;
          height: 820px;
          background: var(--nv-void);
          border-radius: 40px;
          border: 8px solid #030405;
          box-shadow: 0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.03);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          position: relative;
          color: var(--nv-text);
        }
        .nv-screen { flex: 1; overflow-y: auto; padding-bottom: 100px; scrollbar-width: none; }
        .nv-screen::-webkit-scrollbar { display: none; }

        .nv-topbar { display: flex; align-items: center; justify-content: space-between; padding: 18px 18px 10px; }
        .nv-logo {
          font-family: 'Unbounded', sans-serif; font-weight: 800; font-size: 19px; letter-spacing: 0.5px;
          background: linear-gradient(90deg, var(--nv-mint), var(--nv-blue));
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .nv-screen-title { font-family: 'Unbounded', sans-serif; font-weight: 600; font-size: 15px; }
        .nv-topbar-icons { display: flex; gap: 16px; }

        .nv-segmented {
          display: flex; margin: 4px 18px 16px; background: var(--nv-elevated); border-radius: 12px;
          padding: 4px; border: 1px solid var(--nv-border);
        }
        .nv-segmented button {
          flex: 1; border: none; background: transparent; color: var(--nv-muted); font-weight: 600;
          font-size: 13px; padding: 8px 0; border-radius: 9px; cursor: pointer;
        }
        .nv-segmented button.active { background: var(--nv-mint); color: #06120E; }

        .nv-pulse { display: flex; gap: 10px; padding: 0 18px 16px; overflow-x: auto; scrollbar-width: none; }
        .nv-pulse::-webkit-scrollbar { display: none; }
        .nv-pulse-chip {
          display: flex; align-items: center; gap: 7px; flex-shrink: 0; background: var(--nv-elevated);
          border: 1px solid var(--nv-border); border-radius: 100px; padding: 5px 12px 5px 5px; color: var(--nv-text);
          font-size: 11.5px; font-weight: 600;
        }
        .nv-pulse-avatar {
          width: 26px; height: 26px; border-radius: 8px; display: flex; align-items: center; justify-content: center;
          font-size: 10px; font-weight: 700; position: relative; flex-shrink: 0;
        }
        .nv-pulse-avatar.close { box-shadow: 0 0 0 2px var(--nv-mint); }
        .nv-live-dot {
          position: absolute; top: -3px; right: -3px; width: 8px; height: 8px; border-radius: 50%;
          background: var(--nv-pink); border: 2px solid var(--nv-void);
        }

        .nv-wellbeing {
          margin: 0 18px 16px; display: flex; gap: 12px; align-items: flex-start; background: var(--nv-elevated);
          border: 1px solid var(--nv-border); border-radius: 16px; padding: 14px;
        }
        .nv-wellbeing-icon {
          width: 30px; height: 30px; border-radius: 9px; background: linear-gradient(135deg, var(--nv-amber), var(--nv-pink));
          display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #1a0f08;
        }
        .nv-wellbeing-text { flex: 1; }
        .nv-wellbeing-title { font-weight: 700; font-size: 13px; margin: 0 0 2px; }
        .nv-wellbeing-sub { font-size: 12px; color: var(--nv-muted); margin: 0; line-height: 1.4; }
        .nv-wellbeing-close { background: none; border: none; color: var(--nv-muted); cursor: pointer; flex-shrink: 0; }

        .nv-masonry {
          columns: 2; column-gap: 10px; padding: 0 18px;
        }
        .nv-masonry-profile { padding: 12px 18px 0; }
        .nv-tile {
          width: 100%; margin-bottom: 10px; border-radius: 16px; break-inside: avoid; position: relative;
          border: none; padding: 0; display: block; cursor: pointer; overflow: hidden;
        }
        .nv-tile-play {
          position: absolute; top: 8px; right: 8px; background: rgba(0,0,0,0.4); border-radius: 50%;
          width: 22px; height: 22px; display: flex; align-items: center; justify-content: center;
        }
        .nv-tile-footer {
          position: absolute; left: 0; right: 0; bottom: 0; padding: 8px;
          display: flex; align-items: center; gap: 6px;
          background: linear-gradient(0deg, rgba(0,0,0,0.55), transparent);
        }
        .nv-tile-user { font-size: 11px; font-weight: 700; flex: 1; text-align: left; color: white; }
        .nv-tile-likes { font-size: 10.5px; display: flex; align-items: center; gap: 3px; color: white; }

        .nv-detail-topbar { display: flex; align-items: center; justify-content: space-between; padding: 16px 18px 10px; }
        .nv-detail-media { width: 100%; aspect-ratio: 4/5; }
        .nv-post-head { display: flex; align-items: center; gap: 10px; padding: 14px 18px 10px; }
        .nv-post-headtext { display: flex; flex-direction: column; flex: 1; }
        .nv-username { font-weight: 700; font-size: 13px; }
        .nv-time { font-size: 11px; color: var(--nv-muted); }
        .nv-avatar { display: flex; align-items: center; justify-content: center; font-weight: 700; color: white; flex-shrink: 0; }
        .nv-play-badge {
          position: absolute; margin: 12px; background: rgba(0,0,0,0.45); border-radius: 50%; width: 30px; height: 30px;
          display: flex; align-items: center; justify-content: center;
        }
        .nv-post-actions { display: flex; justify-content: space-between; padding: 4px 18px 4px; }
        .nv-post-actions-left { display: flex; gap: 14px; }
        .nv-icon-btn { background: none; border: none; color: var(--nv-text); cursor: pointer; padding: 0; display: flex; }
        .nv-post-body { padding: 4px 18px 0; }
        .nv-likes { font-weight: 700; font-size: 13px; margin: 4px 0; }
        .nv-caption { font-size: 13px; line-height: 1.5; margin: 0 0 4px; }
        .nv-comments-link { font-size: 12px; color: var(--nv-muted); margin: 0; }

        .nv-tip {
          margin: 12px 14px 0; display: flex; align-items: center; gap: 8px; background: var(--nv-elevated-2);
          border: 1px solid var(--nv-border); border-radius: 12px; padding: 8px 12px; font-size: 11.5px;
          color: var(--nv-text); position: relative; z-index: 5;
        }
        .nv-tip button { margin-left: auto; background: none; border: none; color: var(--nv-muted); flex-shrink: 0; }

        .nv-reels-rail { height: 100%; overflow-y: auto; scroll-snap-type: y mandatory; padding-bottom: 0; }
        .nv-reel {
          height: calc(100% - 0px); scroll-snap-align: start; position: relative; display: flex;
          flex-direction: column; justify-content: space-between; color: white;
        }
        .nv-reel-topbar { display: flex; align-items: center; justify-content: space-between; padding: 18px; font-size: 13px; font-weight: 700; }
        .nv-reel-center { display: flex; align-items: center; justify-content: center; flex: 1; }
        .nv-reel-rail-actions { position: absolute; right: 12px; bottom: 90px; display: flex; flex-direction: column; align-items: center; gap: 18px; }
        .nv-reel-action { background: none; border: none; color: white; display: flex; flex-direction: column; align-items: center; gap: 3px; font-size: 11px; font-weight: 600; }
        .nv-reel-bottom { padding: 0 70px 24px 18px; }
        .nv-reel-caption { font-size: 13px; margin: 4px 0; line-height: 1.4; }
        .nv-reel-music { font-size: 12px; display: flex; align-items: center; gap: 5px; opacity: 0.9; margin: 0; }

        .nv-create-options { display: flex; flex-direction: column; gap: 12px; padding: 8px 18px; }
        .nv-create-card {
          display: flex; flex-direction: column; align-items: flex-start; gap: 4px; background: var(--nv-elevated);
          border: 1px solid var(--nv-border); border-radius: 16px; padding: 16px; text-align: left; color: var(--nv-text); cursor: pointer;
        }
        .nv-create-card.highlight { border-color: var(--nv-mint); background: linear-gradient(135deg, rgba(0,230,168,0.12), rgba(255,61,127,0.08)); }
        .nv-create-card span { font-weight: 700; font-size: 14px; margin-top: 4px; }
        .nv-create-card small { color: var(--nv-muted); font-size: 12px; }
        .nv-create-note { margin: 18px 18px 0; display: flex; gap: 10px; align-items: flex-start; color: var(--nv-muted); font-size: 12px; line-height: 1.5; }

        .nv-broadcast {
          margin: 4px 18px 16px; display: flex; gap: 10px; align-items: flex-start; background: var(--nv-elevated);
          border: 1px solid var(--nv-border); border-radius: 14px; padding: 12px;
        }
        .nv-broadcast-title { font-weight: 700; font-size: 13px; margin: 0; }
        .nv-broadcast-sub { font-size: 11.5px; color: var(--nv-muted); margin: 2px 0 0; line-height: 1.4; }
        .nv-threads { display: flex; flex-direction: column; }
        .nv-thread { display: flex; align-items: center; gap: 12px; padding: 10px 18px; }
        .nv-thread-text { display: flex; flex-direction: column; flex: 1; }
        .nv-thread-preview { font-size: 12px; color: var(--nv-muted); }

        .nv-profile-head { display: flex; align-items: flex-start; gap: 14px; padding: 8px 18px 14px; }
        .nv-profile-name { font-weight: 700; font-size: 13.5px; margin: 4px 0 4px; }
        .nv-profile-bio { font-size: 12.5px; color: var(--nv-muted); margin: 0; line-height: 1.4; }
        .nv-stat-pills { display: flex; gap: 8px; padding: 0 18px 14px; }
        .nv-stat-pill {
          flex: 1; display: flex; flex-direction: column; align-items: center; gap: 2px; background: var(--nv-elevated);
          border: 1px solid var(--nv-border); border-radius: 12px; padding: 8px 0;
        }
        .nv-stat-pill strong { font-size: 14px; }
        .nv-stat-pill span { font-size: 10px; color: var(--nv-muted); }
        .nv-profile-buttons { display: flex; gap: 10px; padding: 0 18px 16px; }
        .nv-btn-secondary { flex: 1; background: var(--nv-elevated); border: 1px solid var(--nv-border); color: var(--nv-text); font-weight: 600; font-size: 12.5px; padding: 9px; border-radius: 10px; }
        .nv-profile-tabs { display: flex; gap: 6px; padding: 0 18px 12px; }
        .nv-profile-tabs button {
          flex: 1; padding: 8px 0; background: var(--nv-elevated); border: 1px solid var(--nv-border); border-radius: 10px;
          color: var(--nv-muted); font-size: 12px; font-weight: 600;
        }
        .nv-profile-tabs button.active { color: #06120E; background: var(--nv-mint); border-color: var(--nv-mint); }

        .nv-collections { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; padding: 4px 18px; }
        .nv-collection { display: flex; flex-direction: column; gap: 4px; }
        .nv-collection-cover { aspect-ratio: 1; border-radius: 14px; display: flex; align-items: flex-end; justify-content: flex-end; padding: 8px; }
        .nv-collection-name { font-size: 12.5px; font-weight: 700; }
        .nv-collection-count { font-size: 11px; color: var(--nv-muted); }

        .nv-dock {
          position: absolute; left: 22px; right: 22px; bottom: 20px;
          display: flex; align-items: center; justify-content: space-around;
          background: rgba(19,25,36,0.92); backdrop-filter: blur(10px);
          border: 1px solid var(--nv-border); border-radius: 100px; padding: 8px 10px;
          box-shadow: 0 12px 30px rgba(0,0,0,0.4);
        }
        .nv-dock button { background: none; border: none; color: var(--nv-muted); padding: 8px; cursor: pointer; display: flex; }
        .nv-dock button.active { color: var(--nv-mint); }
        .nv-dock button.fab {
          background: linear-gradient(135deg, var(--nv-mint), var(--nv-blue)); border-radius: 50%; color: #06120E;
          width: 42px; height: 42px; align-items: center; justify-content: center; margin-top: -18px;
          box-shadow: 0 8px 18px rgba(0,230,168,0.35);
        }
      `}</style>

      <div className="nv-phone">
        {tab === "home" && !openPost && (
          <HomeScreen
            mode={mode} setMode={setMode}
            showWellbeing={showWellbeing} dismissWellbeing={() => setShowWellbeing(false)}
            onOpenPost={setOpenPost}
          />
        )}
        {tab === "home" && openPost && (
          <PostDetail
            post={openPost}
            liked={!!liked[openPost.id]}
            saved={!!saved[openPost.id]}
            onLike={() => toggleLike(openPost.id)}
            onSave={() => toggleSave(openPost.id)}
            onBack={() => setOpenPost(null)}
          />
        )}
        {tab === "discover" && <DiscoverScreen showTip={showTip} dismissTip={() => setShowTip(false)} />}
        {tab === "create" && <CreateScreen />}
        {tab === "inbox" && <InboxScreen />}
        {tab === "profile" && <ProfileScreen />}

        <div className="nv-dock">
          {NAV.map(({ id, icon: Icon, isFab }) => (
            <button
              key={id}
              className={(tab === id ? "active" : "") + (isFab ? " fab" : "")}
              onClick={() => { setTab(id); setOpenPost(null); }}
            >
              <Icon size={isFab ? 22 : 21} strokeWidth={tab === id ? 2.4 : 2} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
