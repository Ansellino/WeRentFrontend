type Category = {
  id: string;
  name: string;
};

async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch('https://werentbackend.onrender.com/api/products', {
      next: { revalidate: 60 }, // caching (ISR)
    });

    if (!res.ok) throw new Error('Failed');

    const data = await res.json();
    return data.data || [];
  } catch {
    return [];
  }
}

export async function Footer() {
  const categories = await getCategories();

  return (
    <footer className="w-full mt-16 bg-[#f8f5f2] text-[#2b2b2b] text-sm border-t">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-xl font-semibold mb-3">WeRent</h2>
          <p className="text-gray-600">
            Discover premium fashion rental for every occasion.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h3 className="font-medium mb-3">Explore</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/products">Collections</a>
            </li>
            <li>
              <a href="/register">Join Us</a>
            </li>
            <li>
              <a href="/faq">FAQ</a>
            </li>
          </ul>
        </div>

        {/* Categories (DYNAMIC) */}
        <div>
          <h3 className="font-medium mb-3">Categories</h3>
          <ul className="space-y-2 text-gray-600">
            {categories.length > 0 ? (
              categories.slice(0, 3).map((cat) => (
                <li key={cat.id}>
                  <a
                    href={`/products?category=${cat.id}`}
                    className="hover:text-black"
                  >
                    {cat.name}
                  </a>
                </li>
              ))
            ) : (
              <li className="text-gray-400">No categories</li>
            )}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-medium mb-3">Contact</h3>
          <p className="text-gray-600">elang@gmail.com</p>
          <p className="text-gray-600">+62 812-9024-8515</p>
        </div>
      </div>

      <div className="border-t py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} WeRent
      </div>
    </footer>
  );
}
