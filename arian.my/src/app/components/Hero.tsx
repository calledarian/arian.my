'use client';

import { Card, CardActionArea, CardContent, CardMedia, Container, Typography } from '@mui/material';
import { useEffect } from 'react';
import 'glightbox/dist/css/glightbox.min.css';

const cards = [
    {
        id: 1,
        title: "Content Management System",
        path: ["CMS/bible-education-centre-2.png", "CMS/bible-education-centre-3.png", "CMS/bible-education-centre-4.png", "CMS/bible-education-centre.png"],
        description: "Developed a high-performance full-stack platform serving as a centralized hub for Bible Education Centre's activities. Administrators can securely manage events and content via a streamlined dashboard, enhancing outreach and improving user engagement."
    },
    {
        id: 2,
        title: "Booking Management System",
        path: ["BMS/booking-management-system.png", "BMS/booking-management-system-2.png", "BMS/booking-management-system-3.png", "BMS/booking-management-system-5.png", "BMS/booking-management-system-4.png"],
        description: "Built a secure, automated booking platform for a local tour guide. The system enables clients to book tours seamlessly while giving administrators full control over packages, confirmations, and user requests. Features include robust authentication, spam protection, and efficient admin workflows."
    },
    {
        id: 3,
        title: "Food Ordering WebApp",
        path: "coming-soon.jpg",
        description: "Created a Telegram-based food ordering application that streamlines communication between customers, managers, and staff. Customers place orders directly through the bot, managers approve requests, and workers receive real-time notifications—eliminating delays and reducing miscommunication."
    }
];

export default function Hero() {
    useEffect(() => {
        let lightbox: any;

        import('glightbox').then(({ default: GLightbox }) => {
            lightbox = GLightbox({ selector: '.glightbox', loop: true });
        });

        return () => {
            if (lightbox) lightbox.destroy();
        };
    }, []);


    return (
        <Container component="main" maxWidth="lg" sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(345px, 1fr))",
            gap: 2
        }}>
            {cards.map(card => (
                <Card key={card.id} sx={{ borderRadius: 4 }}>
                    <CardActionArea>
                        {/* Render first image as visible */}
                        <a href={Array.isArray(card.path) ? card.path[0] : card.path} className="glightbox" data-gallery={`gallery-${card.id}`}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={Array.isArray(card.path) ? card.path[0] : card.path}
                                alt={card.title}
                            />
                        </a>

                        {/* Render remaining images as hidden links for GLightbox gallery */}
                        {Array.isArray(card.path) && card.path.slice(1).map((img, idx) => (
                            <a key={idx} href={img} className="glightbox" data-gallery={`gallery-${card.id}`} style={{ display: 'none' }} />
                        ))}

                        <CardContent sx={{ background: "var(--card-color)", color: 'var(--background)', minHeight: 220 }}>
                            <Typography gutterBottom variant="h5" component="div">{card.title}</Typography>
                            <Typography variant="body2" sx={{ color: 'var(--background)' }}>{card.description}</Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}

        </Container>
    );
}
