import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-default-background">
      {/* Header */}
      <header className="bg-neutral-50 border-b border-neutral-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-heading-2 font-heading-2 text-default-font">CRM Pro</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-subtext-color hover:text-default-font transition-colors">Features</a>
              <a href="#pricing" className="text-subtext-color hover:text-default-font transition-colors">Pricing</a>
              <a href="#about" className="text-subtext-color hover:text-default-font transition-colors">About</a>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="text-subtext-color hover:text-default-font transition-colors">Sign In</button>
              <button className="bg-brand-primary text-white px-4 py-2 rounded-sm hover:bg-brand-600 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-default-font mb-6">
            Manage Your Customer
            <span className="text-brand-primary"> Relationships</span>
            <br />
            Like Never Before
          </h1>
          <p className="text-body font-body text-subtext-color mb-8 max-w-3xl mx-auto">
            Streamline your sales process, track customer interactions, and grow your business 
            with our powerful CRM platform designed for modern teams.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            
            <button className="border-2 border-neutral-border text-default-font px-8 py-4 rounded-sm text-body-bold font-body-bold hover:border-neutral-300 hover:bg-neutral-50 transition-colors">
              Contact Sales
            </button>
            <Link 
              href="/hub"
              className="bg-brand-primary text-white px-8 py-4 rounded-sm text-body-bold font-body-bold hover:bg-brand-600 transition-colors shadow-md"
            >
              View Demo
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-heading-1 font-heading-1 text-default-font mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-body font-body text-subtext-color max-w-2xl mx-auto">
              Our CRM platform provides all the tools you need to manage customers, 
              track sales, and grow your business.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-neutral-50 p-8 rounded-md shadow-sm border border-neutral-border">
              <div className="w-12 h-12 bg-brand-900 rounded-sm flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-heading-3 font-heading-3 text-default-font mb-2">Contact Management</h3>
              <p className="text-body font-body text-subtext-color">
                Keep all your customer information organized and easily accessible in one place.
              </p>
            </div>

            <div className="bg-neutral-50 p-8 rounded-md shadow-sm border border-neutral-border">
              <div className="w-12 h-12 bg-success-900 rounded-sm flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-heading-3 font-heading-3 text-default-font mb-2">Sales Analytics</h3>
              <p className="text-body font-body text-subtext-color">
                Track your sales performance with detailed analytics and reporting tools.
              </p>
            </div>

            <div className="bg-neutral-50 p-8 rounded-md shadow-sm border border-neutral-border">
              <div className="w-12 h-12 bg-warning-900 rounded-sm flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-heading-3 font-heading-3 text-default-font mb-2">Automation</h3>
              <p className="text-body font-body text-subtext-color">
                Automate repetitive tasks and workflows to focus on what matters most.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-32 bg-neutral-100 rounded-md p-12 text-center border border-neutral-border">
          <h2 className="text-heading-1 font-heading-1 text-default-font mb-4">
            Ready to transform your business?
          </h2>
          <p className="text-body font-body text-subtext-color mb-8 max-w-2xl mx-auto">
            Join thousands of companies already using our CRM to grow their business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/hub"
              className="bg-brand-primary text-white px-8 py-4 rounded-sm text-body-bold font-body-bold hover:bg-brand-600 transition-colors"
            >
              Start Free Demo
            </Link>
            <button className="border-2 border-neutral-border text-default-font px-8 py-4 rounded-sm text-body-bold font-body-bold hover:border-neutral-300 hover:bg-neutral-50 transition-colors">
              Talk to Sales
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-neutral-50 border-t border-neutral-border mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-subtext-color">
            <p className="text-body font-body">&copy; 2024 CRM Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
