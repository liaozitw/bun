import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

interface NewsItem {
    id: string;
    title: string;
    sourceLink: string;
    contentHtml: string;
}

interface ApiResponse {
    ok: boolean;
    items: NewsItem[];
}

const App = () => {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('https://today.tainanoutlook.com/api/news')
            .then(res => res.json())
            .then((data: ApiResponse) => {
                if (data.ok) {
                    setNews(data.items);
                } else {
                    setError('無法取得新聞資料');
                }
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError('系統發生錯誤，請稍後再試');
                setLoading(false);
            });
    }, []);

    const stripHtml = (html: string) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    };

    return (
        <>
            <header>
                <h1>台南今日新聞</h1>
                <p>掌握台南大小事，提供最即時的市府動態</p>
            </header>

            <main>
                {loading ? (
                    <div className="loading">正在為您載入最新新聞...</div>
                ) : error ? (
                    <div className="error">{error}</div>
                ) : (
                    <div className="news-grid">
                        {news.map(item => (
                            <div key={item.id} className="news-card">
                                <div className="news-content">
                                    <div className="news-title">{item.title}</div>
                                    <div className="news-snippet">{stripHtml(item.contentHtml)}</div>
                                </div>
                                <div className="news-footer">
                                    <a 
                                        href={item.sourceLink} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="read-more"
                                    >
                                        閱讀全文 →
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <footer>
                <p>&copy; 2026 台南意向 Tainan Outlook. 資料來源：台南市政府.</p>
            </footer>
        </>
    );
};

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(<App />);
}
