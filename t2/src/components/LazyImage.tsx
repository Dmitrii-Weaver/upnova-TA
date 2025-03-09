import { useEffect, useRef, useState } from "react";

const LazyImage = ({ src, alt }: { src: string; alt: string }) => {
    const imgRef = useRef<HTMLImageElement>(null);
    const [loadedSrc, setLoadedSrc] = useState<string | null>(null);

    //only load the visible/buffered images using observer
    useEffect(() => {
        let observer: IntersectionObserver;
        let img = new Image();

        const preloadImage = () => {
            img.src = src;
            img.onload = () => setLoadedSrc(src);
        };

        if (imgRef.current) {
            observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        preloadImage();
                        observer.disconnect();
                    }
                },
                { rootMargin: "200px" } // Load earlier for better experience
            );

            observer.observe(imgRef.current);
        }

        return () => observer && observer.disconnect();
    }, [src]);

    return (
        <img
            ref={imgRef}
            src={loadedSrc || ""}
            alt={alt}
            loading="lazy"
            style={{
                width: "100px",
                height: "100px",
                background: "#eee",
                transition: "opacity 0.3s ease-in-out",
                opacity: loadedSrc ? 1 : 0.3,
                borderRadius: "8px",
            }}
        />
    );
};

export default LazyImage