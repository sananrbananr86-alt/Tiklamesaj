# TıkMesaj - Online Mesajlaşma Platformu

## Overview

TıkMesaj, tam özellikli bir online mesajlaşma platformudur. WhatsApp benzeri arayüze sahip bu uygulama, gerçek zamanlı mesajlaşma, kullanıcı kimlik doğrulama, kişi yönetimi ve grup sohbet özellikleri sunar. Uygulama, modern web teknolojileri kullanılarak tek bir HTML dosyasında geliştirilmiştir ve tamamen Türkçe arayüze sahiptir.

## User Preferences

Preferred communication style: Simple, everyday language (Basit, günlük dil).

## System Architecture

### Application Features
- **Kullanıcı Kimlik Doğrulama**: E-posta tabanlı kayıt sistemi, e-posta doğrulama kodu gönderimi
- **Gerçek Zamanlı Mesajlaşma**: Anında mesaj gönderme ve alma, yazıyor göstergesi
- **Kişi Yönetimi**: E-posta ile arkadaş ekleme, kişi listesi yönetimi
- **Grup Sohbetleri**: Grup oluşturma ve grup mesajlaşması
- **Online Durum Takibi**: Kullanıcıların çevrimiçi/çevrimdışı durumlarını görme
- **Arama Özelliği**: Sohbet ve kişiler arasında arama yapabilme

### Frontend Architecture
- **Single Page Application (SPA)**: Vanilla HTML, CSS ve JavaScript ile geliştirilmiş
- **Class-Based JavaScript**: TikMesajApp sınıfı ile organize edilmiş kod yapısı
- **Event-Driven Architecture**: Kullanıcı etkileşimleri için kapsamlı event listener sistemi
- **Local Storage Integration**: Kullanıcı verilerinin yerel depolama ile senkronizasyonu

### UI/UX Design
- **Modern Gradient Design**: Turkuaz ve pembe tonlarında gradient renk paleti
- **Responsive Interface**: Mobil ve masaüstü uyumlu responsive tasarım
- **Animated Interactions**: CSS animasyonları ile zenginleştirilmiş kullanıcı deneyimi
- **Modal Systems**: Kişi ekleme ve grup oluşturma için modal arayüzler

### Data Management
- **Local Storage Database**: Kullanıcı hesapları, kişiler, sohbetler ve mesajlar localStorage'da saklanır
- **Real-time Simulation**: Demo botları ile gerçek zamanlı mesajlaşma simülasyonu
- **Data Persistence**: Oturum boyunca veri kalıcılığı ve otomatik yedekleme

### Authentication System
- **Email Verification**: 6 haneli kod ile e-posta doğrulama sistemi
- **Secure Storage**: Kullanıcı bilgilerinin güvenli şekilde localStorage'da saklanması
- **Session Management**: Kullanıcı oturumlarının otomatik yönetimi

## Technical Features

### Connection Management
- **Heartbeat System**: Düzenli bağlantı durumu kontrolü
- **Online/Offline Status**: Gerçek zamanlı bağlantı durumu göstergesi
- **Auto-reconnection**: Bağlantı kesintilerinde otomatik yeniden bağlanma

### Message System
- **Real-time Messaging**: Anında mesaj iletimi ve alma
- **Message Persistence**: Mesajların kalıcı olarak saklanması
- **Typing Indicators**: Yazıyor göstergeleri ve durum güncellemeleri
- **Message Timestamps**: Zaman damgalı mesaj sistemi

### Contact & Group Management
- **Email-based Contact Addition**: E-posta adresi ile kişi ekleme
- **Group Creation**: Grup sohbetleri oluşturma ve yönetme
- **Contact Synchronization**: Kişi listesinin otomatik senkronizasyonu

## External Dependencies

### CDN Dependencies
- **Font Awesome 6.0.0**: İkon kütüphanesi (cdnjs.cloudflare.com)

### Browser Requirements
- **Modern Browser Support**: CSS Grid, Flexbox ve ES6+ desteği gereken tarayıcılar
- **Local Storage Support**: Veri kalıcılığı için localStorage desteği
- **Responsive Viewport**: Mobil ve masaüstü cihaz desteği

### Development Environment
- **Single File Application**: Tek HTML dosyasında tüm kod
- **No Build Process**: Derleme veya paketleme gerektirmez
- **Static Hosting Ready**: Herhangi bir statik dosya sunucusunda çalışabilir

## Recent Changes (August 12, 2025)

### Latest Update: Gerçek Zamanlı WebSocket Platform
- **Tamamen gerçek zamanlı mesajlaşma sistemi uygulandı**
- Node.js + Express + WebSocket backend sunucusu oluşturuldu
- Anlık mesaj gönderme ve alma (WebSocket ile)
- Gerçek zamanlı kullanıcı durumu (çevrimiçi/çevrimdışı)
- Canlı yazıyor göstergeleri
- Otomatik yeniden bağlanma sistemi
- TıkMesaj Destek hesabı ile otomatik yanıtlar
- Arkadaşlık istekleri gerçek zamanlı bildirimleri
- Tam responsive tasarım ve modern animasyonlar
- localStorage yerine sunucu tabanlı veri yönetimi