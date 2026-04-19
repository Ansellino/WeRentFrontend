export function Footer() {
  return (
    <footer className="w-full mt-10 border-t-4 border-black bg-[#3b2f2f] text-white text-sm">
      <div className="max-w-5xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Brand */}
        <div>
          <h2 className="text-[#9acd32] text-lg mb-2">WeRent</h2>
          <p className="text-gray-300">Platform penyewaan terpercaya dengan sistem modern dan mudah digunakan.</p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-[#9acd32] mb-2">Menu</h3>
          <ul className="space-y-1">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/register" className="hover:underline">
                Register
              </a>
            </li>
            <li>
              <a href="/login" className="hover:underline">
                Login
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-[#9acd32] mb-2">Contact</h3>
          <p>Email: elang@gmail.com</p>
          <p>Phone: +62 812-9024-8515</p>
        </div>
      </div>

      <div className="text-center py-3 border-t border-black text-gray-400 text-xs">© {new Date().getFullYear()} Elang. All rights reserved.</div>
    </footer>
  );
}
