import React from "react";

const AuthenticationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="grid min-h-screen place-content-center space-y-8  bg-mesh-background bg-cover bg-center">
      <div className="space-y-4 text-center text-brand-accent">
        <h1 className="font-cosiAzure text-5xl">Solde</h1>
        <h2 className="font-serif text-4xl">Take control of your spending</h2>
      </div>
      <section className="relative w-[548px] rounded-lg border-l-2 border-t-2 border-white/90 bg-gradient-to-br from-white/50 to-white/10 px-8 py-16 shadow-[-12px_12px_32px_0] shadow-black/25 backdrop-blur-[1px]">
        {children}
      </section>
    </main>
  );
};

export default AuthenticationLayout;
