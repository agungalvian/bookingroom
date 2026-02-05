import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";

export default async function SignInPage() {
    const session = await auth();

    if (session) {
        redirect("/");
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100">
            <div className="glass-card p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-6">
                        <img
                            src="/logo-bptapera-full.png"
                            alt="BP TAPERA Logo"
                            className="w-40 h-40 object-contain"
                        />
                    </div>
                    <h1 className="text-2xl font-bold text-primary">Pemesanan Ruang Meeting</h1>
                    <p className="text-text-light mt-2">BP TAPERA</p>
                </div>

                <form
                    action={async (formData) => {
                        "use server";
                        await signIn("credentials", {
                            email: formData.get("email"),
                            password: formData.get("password"),
                            redirectTo: "/",
                        });
                    }}
                    className="space-y-4"
                >
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-text-dark mb-2">
                            Email / Username
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="text"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            placeholder="Email atau Username"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-text-dark mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full btn-primary py-3 rounded-lg font-semibold text-white"
                    >
                        Masuk
                    </button>
                </form>

            </div>
        </div>
    );
}
