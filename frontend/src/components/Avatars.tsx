import React from 'react';
import { BrainCircuit, Sparkles } from 'lucide-react';

type AvatarSize = 'sm' | 'md' | 'lg';

const sizeClasses: Record<AvatarSize, string> = {
  sm: 'h-10 w-10',
  md: 'h-12 w-12',
  lg: 'h-14 w-14',
};

export const AcademyAvatar: React.FC<{ size?: AvatarSize; className?: string; online?: boolean }> = ({ size = 'md', className = '', online = false }) => (
  <div className={`academy-avatar relative flex flex-shrink-0 items-center justify-center ${sizeClasses[size]} ${className}`} aria-label="PCMB Academy AI">
    <BrainCircuit size={size === 'lg' ? 27 : size === 'md' ? 23 : 19} strokeWidth={2.35} />
    <Sparkles className="academy-avatar-sparkle" size={size === 'lg' ? 12 : 10} fill="currentColor" />
    {online && <span className="academy-avatar-status" aria-label="AI online" />}
  </div>
);

export const UserAvatar: React.FC<{ name: string; avatar?: string; size?: AvatarSize; className?: string }> = ({ name, avatar, size = 'md', className = '' }) => (
  <div className={`user-avatar flex flex-shrink-0 items-center justify-center overflow-hidden ${sizeClasses[size]} ${className}`} aria-label={`${name}'s profile`}>
    {avatar ? <img src={avatar} alt="" className="h-full w-full object-cover" /> : <span>{name.trim().charAt(0).toUpperCase() || 'U'}</span>}
  </div>
);
