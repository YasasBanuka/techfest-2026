"use client";

import { motion } from "framer-motion";

/**
 * FadeInUp — Reusable scroll-triggered animation wrapper
 *
 * Usage:
 *   <FadeInUp>  → fades in + slides up when entering viewport
 *   <FadeInUp delay={0.2}>  → with 0.2s delay
 *   <FadeInUp className="...">  → with extra classes
 */
export default function FadeInUp({ children, delay = 0, className = "" }) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
}

/**
 * StaggerContainer — Wrapper that staggers children animations
 *
 * Usage:
 *   <StaggerContainer>
 *     <StaggerItem>Card 1</StaggerItem>
 *     <StaggerItem>Card 2</StaggerItem>   ← 0.1s later
 *     <StaggerItem>Card 3</StaggerItem>   ← 0.2s later
 *   </StaggerContainer>
 */
export function StaggerContainer({ children, className = "" }) {
    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
            }}
        >
            {children}
        </motion.div>
    );
}

export function StaggerItem({ children, className = "" }) {
    return (
        <motion.div
            className={className}
            variants={{
                hidden: { opacity: 0, y: 35 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
            }}
        >
            {children}
        </motion.div>
    );
}
