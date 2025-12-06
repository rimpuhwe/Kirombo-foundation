export default function SupportContinue() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-lg w-full bg-white rounded-xl shadow-lg p-8 space-y-6 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">
          Thank You for Joining the Mission!
        </h1>
        <p className="text-muted-foreground mb-4">
          We’ve sent you an email with guidance on how you can support the
          Abdallah Kiromba Foundation. Please check your inbox (and spam folder)
          for details.
        </p>
        <div className="bg-muted/40 rounded p-4 text-foreground text-base mb-2">
          <div className="mb-2 italic">
            “And whatever good you send forward for yourselves, you will find it
            with Allah — Qur’an 2:110”
          </div>
          <div className="italic">
            “The most beloved deeds to Allah are those done consistently, even
            if small.”
          </div>
        </div>
      </div>
    </div>
  );
}
