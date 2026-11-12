import { clsx } from 'clsx';
import {
    Bolt,
    Building2,
    Droplets,
    Gem,
    Phone,
    ShieldCheck,
    Truck,
    Users,
} from 'lucide-react';
import { createElement } from 'react';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const iconMap = {
    Building2,
    Bolt,
    Truck,
    Droplets,
    Gem,
    Users,
    Phone,
    ShieldCheck,
};

export function getVentureIcon(name) {
    return iconMap[name] || Building2;
}

export function VentureIcon({ name, ...props }) {
    return createElement(iconMap[name] || Building2, props);
}
