import React from "react";
import { motion } from "motion/react";
import { Star } from "lucide-react";

export interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
  rating?: number;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role, rating = 5 }, i) => (
                <div
                  className="p-8 rounded-2xl border border-stone-200/90 bg-[#FDFBF7] shadow-sm hover:shadow-md transition-shadow max-w-xs w-full flex flex-col justify-between"
                  key={i}
                >
                  <div>
                    {/* 5-star rating */}
                    <div className="flex items-center gap-1 text-[#C88D4A] mb-3">
                      {[...Array(rating)].map((_, s) => (
                        <Star key={s} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="font-serif text-[#21130D] text-sm leading-relaxed italic">
                      "{text}"
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mt-6 pt-4 border-t border-stone-200/60">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      referrerPolicy="no-referrer"
                      className="h-10 w-10 rounded-full object-cover border border-stone-200"
                    />
                    <div className="flex flex-col">
                      <div className="font-serif font-bold text-[#21130D] text-sm leading-tight">
                        {name}
                      </div>
                      <div className="text-xs text-stone-500 tracking-tight mt-0.5">
                        {role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
