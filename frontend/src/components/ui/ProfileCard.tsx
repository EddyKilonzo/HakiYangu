'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { Mail, MoreHorizontal, MapPin, Link as LinkIcon } from 'lucide-react';
import './ProfileCard.css';

interface ProfileCardProps {
  avatarUrl?: string;
  initials?: string;
  iconUrl?: string;
  grainUrl?: string;
  innerGradient?: string;
  behindGlowEnabled?: boolean;
  behindGlowColor?: string;
  behindGlowSize?: string;
  className?: string;
  enableTilt?: boolean;
  enableMobileTilt?: boolean;
  mobileTiltSensitivity?: number;
  miniAvatarUrl?: string;
  name?: string;
  title?: string;
  handle?: string;
  status?: string;
  contactText?: string;
  showUserInfo?: boolean;
  onContactClick?: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  avatarUrl,
  initials,
  iconUrl,
  grainUrl,
  innerGradient,
  behindGlowEnabled = true,
  behindGlowColor = "rgba(125, 190, 255, 0.67)",
  behindGlowSize = "50%",
  className = "",
  enableTilt = true,
  enableMobileTilt = false,
  mobileTiltSensitivity = 5,
  miniAvatarUrl,
  name = "Javi A. Torres",
  title = "Software Engineer",
  handle = "javicodes",
  status = "Online",
  contactText = "Contact",
  showUserInfo = true,
  onContactClick
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Motion values for tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Motion values for glow position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), springConfig);

  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXRelative = event.clientX - rect.left;
    const mouseYRelative = event.clientY - rect.top;

    if (enableTilt) {
      x.set(mouseXRelative / width - 0.5);
      y.set(mouseYRelative / height - 0.5);
    }

    mouseX.set(mouseXRelative);
    mouseY.set(mouseYRelative);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div className={`pc-wrapper ${className}`}>
      {behindGlowEnabled && isHovered && (
        <motion.div
          className="pc-behind-glow"
          style={{
            left: glowX,
            top: glowY,
            background: `radial-gradient(circle, ${behindGlowColor} 0%, transparent ${behindGlowSize})`,
          }}
        />
      )}

      <motion.div
        ref={cardRef}
        className="pc-card"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: enableTilt ? rotateX : 0,
          rotateY: enableTilt ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
      >
        <div 
          className="pc-inner"
          style={{ 
            background: innerGradient || 'var(--pc-bg, rgba(255, 255, 255, 0.05))',
          }}
        >
          {grainUrl && (
            <div 
              className="pc-grain" 
              style={{ backgroundImage: `url(${grainUrl})` }} 
            />
          )}
          {iconUrl && (
            <div 
              className="pc-icon-pattern" 
              style={{ backgroundImage: `url(${iconUrl})` }} 
            />
          )}

          <div className="pc-content">
            <div className="pc-avatar-container">
              {avatarUrl && !imageError ? (
                <img 
                  src={avatarUrl} 
                  alt={name} 
                  className="pc-main-avatar" 
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="pc-main-avatar flex items-center justify-center bg-zinc-800 text-xl font-bold text-white border-2 border-zinc-700">
                  {initials || name.charAt(0)}
                </div>
              )}
              <div className={`pc-status-indicator ${status.toLowerCase()}`} />
            </div>

            {showUserInfo && (
              <div className="pc-user-info">
                <h3 className="pc-name">{name}</h3>
                <p className="pc-title">{title}</p>
                <p className="pc-handle">@{handle}</p>
              </div>
            )}

            <div className="pc-actions">
              <button className="pc-contact-btn" onClick={onContactClick}>
                <Mail size={16} />
                {contactText}
              </button>
              <button className="pc-more-btn">
                <MoreHorizontal size={20} />
              </button>
            </div>

            <div className="pc-footer">
              <div className="pc-footer-item">
                <MapPin size={14} />
                <span>Nairobi</span>
              </div>
              <div className="pc-footer-item">
                <LinkIcon size={14} />
                <span>Profile</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileCard;
