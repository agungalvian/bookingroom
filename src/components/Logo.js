import Image from "next/image";

export default function Logo({ size = 40, showText = true, className = "" }) {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <img
                src="/logo-bptapera.svg"
                alt="BP TAPERA Logo"
                width={size}
                height={size}
                className="object-contain"
            />
            {showText && (
                <div className="flex flex-col">
                    <span className="text-lg font-bold text-primary">BP TAPERA</span>
                    <span className="text-xs text-text-light">Meeting Room Booking</span>
                </div>
            )}
        </div>
    );
}
