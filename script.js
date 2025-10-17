// ================================================
// 🚌 Las Rutas de Santo Domingo- Simulador de Transporte Público
// Versión Búsqueda Simple (Solo 0 y 1 Transbordo)
// ================================================

// ============================================
// DATOS Y CONFIGURACIÓN
// ============================================

// Barrios disponibles (26 Barrios)
const locations = [
    // Barrios Originales
    'Gazcue', 'Zona Colonial', 'Naco', 'Piantini', 'Bella Vista',
    'Villa Mella', 'Los Mina', 'Herrera', 'Cristo Rey', 'Villa Francisca',
    // Barrios Nuevos Agregados
    '30 de Mayo', 'El Millón', 'El Cacique', 'Centro de los Héroes', 'Ciudad Universitaria', 
    'Ensanche Capotillo', 'Ensanche La Fe', 'Gualey', 'La Julia', 'Las Praderas', 
    'Jardines del Sur', 'Mirador Sur', 'Mirador Norte', 'Los Proceres', 'San Carlos', 
    'Villa Juana'
];

// Tipos de transporte con sus características
const transportTypes = {
    carro_pirata: { icon: '🚐', name: 'Carro Pirata (Concho)', color: '#3b82f6', role: 'Flexible/Ocasional' },
    guagua_publica: { icon: '🚌', name: 'Guagua Pública', color: '#10b981', role: 'Largas Distancias' },
    carro_publico: { icon: '🚗', name: 'Carro Público', color: '#f59e0b', role: 'Rutas Fijas Principales' },
    motoconcho: { icon: '🏍️', name: 'Motoconcho', color: '#ef4444', role: 'Total Cobertura/Última Milla' },
    combinado: { icon: '🔄', name: 'Combinado (Transbordo)', color: '#8b5cf6', role: 'Transbordo' }
};

// Base de datos de rutas (Tramos con tiempo y costo base)
const routes = [
    // ================================================
    // === 1. RUTAS PRINCIPALES FIJAS (Carro Público y Guagua) ===
    // ================================================
    
    // Rutas Céntricas/Populares Originales
    { type: 'carro_publico', from: 'Gazcue', to: 'Zona Colonial', time: 15, cost: 35 },
    { type: 'carro_publico', from: 'Zona Colonial', to: 'Gazcue', time: 15, cost: 35 },
    { type: 'carro_publico', from: 'Naco', to: 'Piantini', time: 10, cost: 40 },
    { type: 'carro_publico', from: 'Piantini', to: 'Naco', time: 10, cost: 40 },
    
    // Conexiones de Barrios Céntricos a Periféricos Originales/Troncales
    { type: 'guagua_publica', from: 'Cristo Rey', to: 'Zona Colonial', time: 30, cost: 45 },
    { type: 'guagua_publica', from: 'Zona Colonial', to: 'Cristo Rey', time: 30, cost: 45 },
    { type: 'guagua_publica', from: 'Bella Vista', to: 'Herrera', time: 25, cost: 35 },
    { type: 'guagua_publica', from: 'Herrera', to: 'Bella Vista', time: 25, cost: 35 },
    { type: 'carro_publico', from: 'Villa Francisca', to: 'Los Mina', time: 25, cost: 35 },
    { type: 'carro_publico', from: 'Los Mina', to: 'Villa Francisca', time: 25, cost: 35 },
    { type: 'guagua_publica', from: 'Cristo Rey', to: 'Villa Mella', time: 40, cost: 30 },
    { type: 'guagua_publica', from: 'Villa Mella', to: 'Cristo Rey', time: 40, cost: 30 },
    { type: 'carro_publico', from: 'Zona Colonial', to: 'Los Mina', time: 35, cost: 50 },
    { type: 'carro_publico', from: 'Los Mina', to: 'Zona Colonial', time: 35, cost: 50 },
    { type: 'carro_publico', from: 'Gazcue', to: 'Centro de los Héroes', time: 10, cost: 30 },
    { type: 'carro_publico', from: 'Centro de los Héroes', to: 'Gazcue', time: 10, cost: 30 },
    { type: 'carro_publico', from: 'Bella Vista', to: 'Piantini', time: 12, cost: 35 },
    { type: 'carro_publico', from: 'Piantini', to: 'Bella Vista', time: 12, cost: 35 },
    { type: 'carro_publico', from: 'Cristo Rey', to: 'Villa Juana', time: 15, cost: 35 },
    { type: 'carro_publico', from: 'Villa Juana', to: 'Cristo Rey', time: 15, cost: 35 },
    { type: 'carro_publico', from: 'Ensanche La Fe', to: 'Villa Mella', time: 35, cost: 55 },
    { type: 'carro_publico', from: 'Villa Mella', to: 'Ensanche La Fe', time: 35, cost: 55 },

    // Nuevas Rutas Principales de Carro Público/Guagua (26 Barrios)
    { type: 'carro_publico', from: '30 de Mayo', to: 'Centro de los Héroes', time: 15, cost: 35 },
    { type: 'carro_publico', from: 'Centro de los Héroes', to: '30 de Mayo', time: 15, cost: 35 },
    { type: 'carro_publico', from: '30 de Mayo', to: 'Ciudad Universitaria', time: 15, cost: 35 },
    { type: 'carro_publico', from: 'Ciudad Universitaria', to: '30 de Mayo', time: 15, cost: 35 },
    { type: 'guagua_publica', from: 'El Cacique', to: 'Herrera', time: 10, cost: 30 },
    { type: 'guagua_publica', from: 'Herrera', to: 'El Cacique', time: 10, cost: 30 },
    { type: 'carro_publico', from: 'Ciudad Universitaria', to: 'Gazcue', time: 10, cost: 30 },
    { type: 'carro_publico', from: 'Gazcue', to: 'Ciudad Universitaria', time: 10, cost: 30 },
    { type: 'guagua_publica', from: 'Mirador Sur', to: 'Centro de los Héroes', time: 12, cost: 35 },
    { type: 'guagua_publica', from: 'Centro de los Héroes', to: 'Mirador Sur', time: 12, cost: 35 },
    { type: 'guagua_publica', from: 'Los Proceres', to: 'Naco', time: 15, cost: 35 },
    { type: 'guagua_publica', from: 'Naco', to: 'Los Proceres', time: 15, cost: 35 },
    { type: 'carro_publico', from: 'El Millón', to: 'Ensanche La Fe', time: 10, cost: 30 },
    { type: 'carro_publico', from: 'Ensanche La Fe', to: 'El Millón', time: 10, cost: 30 },
    { type: 'carro_publico', from: 'San Carlos', to: 'Villa Francisca', time: 10, cost: 30 },
    { type: 'carro_publico', from: 'Villa Francisca', to: 'San Carlos', time: 10, cost: 30 },
    { type: 'carro_publico', from: 'Villa Juana', to: 'Naco', time: 15, cost: 35 },
    { type: 'carro_publico', from: 'Naco', to: 'Villa Juana', time: 15, cost: 35 },
    { type: 'carro_publico', from: 'Ensanche La Fe', to: 'Piantini', time: 10, cost: 30 },
    { type: 'carro_publico', from: 'Piantini', to: 'Ensanche La Fe', time: 10, cost: 30 },
    { type: 'guagua_publica', from: 'Cristo Rey', to: 'Bella Vista', time: 30, cost: 45 },
    { type: 'guagua_publica', from: 'Bella Vista', to: 'Cristo Rey', time: 30, cost: 45 },
    { type: 'guagua_publica', from: 'Mirador Sur', to: 'Los Proceres', time: 25, cost: 40 },
    { type: 'guagua_publica', from: 'Los Proceres', to: 'Mirador Sur', time: 25, cost: 40 },
    { type: 'guagua_publica', from: 'Los Mina', to: 'Naco', time: 40, cost: 50 },
    { type: 'guagua_publica', from: 'Naco', to: 'Los Mina', time: 40, cost: 50 },
    { type: 'guagua_publica', from: 'Herrera', to: 'Zona Colonial', time: 45, cost: 55 },
    { type: 'guagua_publica', from: 'Zona Colonial', to: 'Herrera', time: 45, cost: 55 },
    { type: 'guagua_publica', from: 'Villa Mella', to: 'Gazcue', time: 55, cost: 60 },
    { type: 'guagua_publica', from: 'Gazcue', to: 'Villa Mella', time: 55, cost: 60 },

    // --- EXPANSION DE RUTAS CARRO PÚBLICO PARA CONECTIVIDAD TOTAL ---
    // Conexiones de la Zona Central (Naco, Piantini, El Millón)
    { type: 'carro_publico', from: 'Naco', to: 'El Millón', time: 10, cost: 35 },
    { type: 'carro_publico', from: 'El Millón', to: 'Naco', time: 10, cost: 35 },
    { type: 'carro_publico', from: 'Piantini', to: 'El Millón', time: 10, cost: 35 },
    { type: 'carro_publico', from: 'El Millón', to: 'Piantini', time: 10, cost: 35 },
    
    // Conexiones del Sur (30 de Mayo, El Cacique, Bella Vista)
    { type: 'carro_publico', from: '30 de Mayo', to: 'El Cacique', time: 8, cost: 30 },
    { type: 'carro_publico', from: 'El Cacique', to: '30 de Mayo', time: 8, cost: 30 },
    { type: 'carro_publico', from: 'El Cacique', to: 'Bella Vista', time: 8, cost: 30 },
    { type: 'carro_publico', from: 'Bella Vista', to: 'El Cacique', time: 8, cost: 30 },
    { type: 'carro_publico', from: 'Centro de los Héroes', to: 'Ciudad Universitaria', time: 10, cost: 30 },
    { type: 'carro_publico', from: 'Ciudad Universitaria', to: 'Centro de los Héroes', time: 10, cost: 30 },
    
    // Conexiones del Suroeste (La Julia, Jardines del Sur, Mirador Sur)
    { type: 'carro_publico', from: 'Bella Vista', to: 'La Julia', time: 5, cost: 30 },
    { type: 'carro_publico', from: 'La Julia', to: 'Bella Vista', time: 5, cost: 30 },
    { type: 'carro_publico', from: 'La Julia', to: 'Jardines del Sur', time: 7, cost: 30 },
    { type: 'carro_publico', from: 'Jardines del Sur', to: 'La Julia', time: 7, cost: 30 },
    { type: 'carro_publico', from: 'Jardines del Sur', to: 'Mirador Sur', time: 5, cost: 30 },
    { type: 'carro_publico', from: 'Mirador Sur', to: 'Jardines del Sur', time: 5, cost: 30 },
    
    // Conexiones Zona Colonial / Gazcue / Villa Juana
    { type: 'carro_publico', from: 'Zona Colonial', to: 'Villa Juana', time: 10, cost: 35 },
    { type: 'carro_publico', from: 'Villa Juana', to: 'Zona Colonial', time: 10, cost: 35 },
    { type: 'carro_publico', from: 'Gazcue', to: 'San Carlos', time: 7, cost: 30 },
    { type: 'carro_publico', from: 'San Carlos', to: 'Gazcue', time: 7, cost: 30 },
    { type: 'carro_publico', from: 'Villa Francisca', to: 'Villa Juana', time: 5, cost: 30 },
    { type: 'carro_publico', from: 'Villa Juana', to: 'Villa Francisca', time: 5, cost: 30 },

    // Conexiones del Norte (Ensanche La Fe, Cristo Rey, Capotillo)
    { type: 'carro_publico', from: 'Ensanche La Fe', to: 'Cristo Rey', time: 10, cost: 30 },
    { type: 'carro_publico', from: 'Cristo Rey', to: 'Ensanche La Fe', time: 10, cost: 30 },
    { type: 'carro_publico', from: 'Cristo Rey', to: 'Ensanche Capotillo', time: 7, cost: 30 },
    { type: 'carro_publico', from: 'Ensanche Capotillo', to: 'Cristo Rey', time: 7, cost: 30 },
    
    // Conexión Norte-Centro (Villa Mella)
    { type: 'carro_publico', from: 'Villa Mella', to: 'Mirador Norte', time: 15, cost: 45 },
    { type: 'carro_publico', from: 'Mirador Norte', to: 'Villa Mella', time: 15, cost: 45 },

    // Conexiones Puente/Margen Oriental
    { type: 'carro_publico', from: 'Los Mina', to: 'Gualey', time: 15, cost: 35 },
    { type: 'carro_publico', from: 'Gualey', to: 'Los Mina', time: 15, cost: 35 },
    { type: 'carro_publico', from: 'Herrera', to: 'Los Mina', time: 40, cost: 60 },
    { type: 'carro_publico', from: 'Los Mina', to: 'Herrera', time: 40, cost: 60 },
    
    // ================================================
    // === 2. RUTAS PIRATAS/CONCHOS (Limitado a barrios periféricos/concho) ===
    // ================================================
    { type: 'carro_pirata', from: 'Herrera', to: 'Villa Francisca', time: 35, cost: 55 }, 
    { type: 'carro_pirata', from: 'Villa Francisca', to: 'Herrera', time: 35, cost: 55 },
    { type: 'carro_pirata', from: 'Los Mina', to: 'Cristo Rey', time: 40, cost: 65 },
    { type: 'carro_pirata', from: 'Cristo Rey', to: 'Los Mina', time: 40, cost: 65 },
    { type: 'carro_pirata', from: 'Ensanche Capotillo', to: 'Cristo Rey', time: 10, cost: 30 }, // Se mantiene pirata, aunque el público es similar
    { type: 'carro_pirata', from: 'Cristo Rey', to: 'Ensanche Capotillo', time: 10, cost: 30 },
    { type: 'carro_pirata', from: 'Gualey', to: 'Villa Juana', time: 15, cost: 35 },
    { type: 'carro_pirata', from: 'Villa Juana', to: 'Gualey', time: 15, cost: 35 },
    { type: 'carro_pirata', from: 'Ensanche Capotillo', to: 'Gualey', time: 15, cost: 35 },
    { type: 'carro_pirata', from: 'Gualey', to: 'Ensanche Capotillo', time: 15, cost: 35 },
    { type: 'carro_pirata', from: 'Villa Juana', to: 'Ensanche Capotillo', time: 10, cost: 30 },
    { type: 'carro_pirata', from: 'Ensanche Capotillo', to: 'Villa Juana', time: 10, cost: 30 },
    
    // ================================================
    // === 3. RUTAS MOTOCONCHOS (Cobertura completa) ===
    // ================================================
    
    // Rutas existentes
    { type: 'motoconcho', from: '30 de Mayo', to: 'Bella Vista', time: 10, cost: 130 },
    { type: 'motoconcho', from: 'Bella Vista', to: '30 de Mayo', time: 10, cost: 130 },
    { type: 'motoconcho', from: 'El Millón', to: 'Naco', time: 7, cost: 130 },
    { type: 'motoconcho', from: 'Naco', to: 'El Millón', time: 7, cost: 130 },
    { type: 'motoconcho', from: 'Las Praderas', to: 'Piantini', time: 8, cost: 130 },
    { type: 'motoconcho', from: 'Piantini', to: 'Las Praderas', time: 8, cost: 130 },
    { type: 'motoconcho', from: 'Jardines del Sur', to: 'Mirador Sur', time: 5, cost: 120 },
    { type: 'motoconcho', from: 'Mirador Sur', to: 'Jardines del Sur', time: 5, cost: 120 },
    { type: 'motoconcho', from: 'Mirador Norte', to: 'Los Proceres', time: 7, cost: 130 },
    { type: 'motoconcho', from: 'Los Proceres', to: 'Mirador Norte', time: 7, cost: 130 },
    { type: 'motoconcho', from: 'San Carlos', to: 'Zona Colonial', time: 8, cost: 130 },
    { type: 'motoconcho', from: 'Zona Colonial', to: 'San Carlos', time: 8, cost: 130 },
    { type: 'motoconcho', from: 'Gualey', to: 'Ensanche Capotillo', time: 10, cost: 140 },
    { type: 'motoconcho', from: 'Ensanche Capotillo', to: 'Gualey', time: 10, cost: 140 },
    { type: 'motoconcho', from: 'Villa Mella', to: 'Los Proceres', time: 25, cost: 190 },
    { type: 'motoconcho', from: 'Los Proceres', to: 'Villa Mella', time: 25, cost: 190 },
    { type: 'motoconcho', from: 'Herrera', to: 'Ciudad Universitaria', time: 20, cost: 170 },
    { type: 'motoconcho', from: 'Ciudad Universitaria', to: 'Herrera', time: 20, cost: 170 },
    { type: 'motoconcho', from: 'Centro de los Héroes', to: 'Gazcue', time: 10, cost: 140 },
    { type: 'motoconcho', from: 'Gazcue', to: 'Centro de los Héroes', time: 10, cost: 140 },
    { type: 'motoconcho', from: 'Los Mina', to: 'El Millón', time: 30, cost: 200 },
    { type: 'motoconcho', from: 'El Millón', to: 'Los Mina', time: 30, cost: 200 },
    { type: 'motoconcho', from: 'Ensanche La Fe', to: 'Villa Francisca', time: 15, cost: 150 },
    { type: 'motoconcho', from: 'Villa Francisca', to: 'Ensanche La Fe', time: 15, cost: 150 },
    { type: 'motoconcho', from: 'Gazcue', to: 'Naco', time: 8, cost: 130 },
    { type: 'motoconcho', from: 'Naco', to: 'Gazcue', time: 8, cost: 130 },
    { type: 'motoconcho', from: 'Piantini', to: 'Bella Vista', time: 10, cost: 130 },
    { type: 'motoconcho', from: 'Bella Vista', to: 'Piantini', time: 10, cost: 130 },
    { type: 'motoconcho', from: 'Zona Colonial', to: 'Villa Francisca', time: 10, cost: 130 },
    { type: 'motoconcho', from: 'Villa Francisca', to: 'Zona Colonial', time: 10, cost: 130 },
    { type: 'motoconcho', from: 'Gazcue', to: 'Cristo Rey', time: 15, cost: 150 },
    { type: 'motoconcho', from: 'Cristo Rey', to: 'Gazcue', time: 15, cost: 150 },
    { type: 'motoconcho', from: 'Herrera', to: 'Bella Vista', time: 15, cost: 160 },
    { type: 'motoconcho', from: 'Bella Vista', to: 'Herrera', time: 15, cost: 160 },
    { type: 'motoconcho', from: 'Villa Mella', to: 'Naco', time: 30, cost: 200 }, 
    { type: 'motoconcho', from: 'Herrera', to: 'Gazcue', time: 28, cost: 200 }, 
    { type: 'motoconcho', from: 'Villa Mella', to: 'Herrera', time: 45, cost: 280 }, 
    
    // --- NUEVAS RUTAS MOTOCONCHO AÑADIDAS PARA COBERTURA COMPLETA ---
    // Conexión El Cacique
    { type: 'motoconcho', from: 'El Cacique', to: 'La Julia', time: 5, cost: 120 },
    { type: 'motoconcho', from: 'La Julia', to: 'El Cacique', time: 5, cost: 120 },
    { type: 'motoconcho', from: 'El Cacique', to: 'Bella Vista', time: 7, cost: 130 }, // Se mantiene aunque ahora hay Carro Público cerca
    { type: 'motoconcho', from: 'Bella Vista', to: 'El Cacique', time: 7, cost: 130 },
    // Conexión La Julia
    { type: 'motoconcho', from: 'La Julia', to: 'Gazcue', time: 10, cost: 140 },
    { type: 'motoconcho', from: 'Gazcue', to: 'La Julia', time: 10, cost: 140 },
    { type: 'motoconcho', from: 'La Julia', to: 'Jardines del Sur', time: 5, cost: 120 },
    { type: 'motoconcho', from: 'Jardines del Sur', to: 'La Julia', time: 5, cost: 120 },
    // Conexión Villa Juana
    { type: 'motoconcho', from: 'Villa Juana', to: 'Ensanche La Fe', time: 8, cost: 130 },
    { type: 'motoconcho', from: 'Ensanche La Fe', to: 'Villa Juana', time: 8, cost: 130 },
    { type: 'motoconcho', from: 'Villa Juana', to: 'San Carlos', time: 5, cost: 120 },
    { type: 'motoconcho', from: 'San Carlos', to: 'Villa Juana', time: 5, cost: 120 },
    // Conexión 30 de Mayo con Gazcue por Motoconcho (para transbordos)
    { type: 'motoconcho', from: '30 de Mayo', to: 'Gazcue', time: 12, cost: 150 },
    { type: 'motoconcho', from: 'Gazcue', to: '30 de Mayo', time: 12, cost: 150 },
];

const translations = {
    es: {
        alerts: 'Alertas Activas',
        rain: '🌧️ Lluvia (+30% tiempo)',
        rush: '🚦 Hora Pico (+40% tiempo)',
        strike: '✊ Paro (+50% tiempo, +RD$20)',
        planRoute: 'Planifica tu Ruta',
        origin: 'Origen',
        destination: 'Destino',
        search: '🔍 Buscar Rutas',
        howItWorks: '¿Cómo Funciona?',
        calc1: '<strong>Cálculo de Tiempo:</strong> Se suma el tiempo base de cada tramo. Por cada alerta activa, el tiempo se multiplica por (1 + porcentaje/100).',
        calc2: '<strong>Cálculo de Costo:</strong> Se suma el costo de cada tramo más los costos extras de las alertas activas.',
        calc3: '<strong>Ordenamiento:</strong> Por defecto se ordenan por tiempo, pero puedes cambiar a costo o número de transbordos.',
        routeMap: 'Mapa de Ruta',
        availableRoutes: 'Rutas Disponibles',
        sortTime: '⏱️ Tiempo',
        sortCost: '💰 Costo',
        sortTransfers: '🔄 Transbordos',
        favorites: '⭐ Rutas Favoritas',
        noFavorites: 'No tienes rutas favoritas guardadas',
        footerText: 'Simulador de rutas del transporte público dominicano',
        saveMode: 'Modo Ahorro',
        noRoutesFound: 'No se encontraron rutas disponibles',
        selectOriginDest: 'Selecciona origen y destino',
        differentLocations: 'Origen y destino deben ser diferentes',
        newSearch: '← Nueva Búsqueda',
        transportCombinado: 'Combinado (Transbordo)'
    },
    en: {
        alerts: 'Active Alerts',
        rain: '🌧️ Rain (+30% time)',
        rush: '🚦 Rush Hour (+40% time)',
        strike: '✊ Strike (+50% time, +RD$20)',
        planRoute: 'Plan Your Route',
        origin: 'Origin',
        destination: 'Destination',
        search: '🔍 Search Routes',
        howItWorks: 'How It Works?',
        calc1: '<strong>Time Calculation:</strong> Sum base time of each segment. For each active alert, time is multiplied by (1 + percentage/100).',
        calc2: '<strong>Cost Calculation:</strong> Sum cost of each segment plus extra costs from active alerts.',
        calc3: '<strong>Sorting:</strong> Default sort by time, but you can change to cost or number of transfers.',
        routeMap: 'Route Map',
        availableRoutes: 'Available Routes',
        sortTime: '⏱️ Time',
        sortCost: '💰 Cost',
        sortTransfers: '🔄 Transfers',
        favorites: '⭐ Favorite Routes',
        noFavorites: 'You have no saved favorite routes',
        footerText: 'Dominican public transport route simulator',
        saveMode: 'Save Mode',
        noRoutesFound: 'No routes found',
        selectOriginDest: 'Select origin and destination',
        differentLocations: 'Origin and destination must be different',
        newSearch: '← New Search',
        transportCombinado: 'Combined (Transfer)'
    }
};

const alerts = {
    rain: { active: false, timePct: 30, costExtra: 0 },
    rush: { active: false, timePct: 40, costExtra: 0 },
    strike: { active: false, timePct: 50, costExtra: 20 }
};

// Posiciones actualizadas para los 26 barrios
const nodePositions = {
    // 10 Originales
    'Gazcue': { x: 400, y: 200 },
    'Zona Colonial': { x: 200, y: 200 },
    'Naco': { x: 500, y: 100 },
    'Piantini': { x: 600, y: 100 },
    'Bella Vista': { x: 400, y: 300 },
    'Villa Mella': { x: 100, y: 50 },
    'Los Mina': { x: 800, y: 250 },
    'Herrera': { x: 650, y: 400 },
    'Cristo Rey': { x: 300, y: 50 },
    'Villa Francisca': { x: 300, y: 250 },
    // 16 Nuevos (Ajustando posiciones relativas)
    '30 de Mayo': { x: 500, y: 450 },
    'El Millón': { x: 550, y: 150 },
    'El Cacique': { x: 500, y: 350 },
    'Centro de los Héroes': { x: 300, y: 400 },
    'Ciudad Universitaria': { x: 250, y: 300 },
    'Ensanche Capotillo': { x: 200, y: 100 },
    'Ensanche La Fe': { x: 450, y: 150 },
    'Gualey': { x: 150, y: 150 },
    'La Julia': { x: 400, y: 350 },
    'Las Praderas': { x: 700, y: 150 },
    'Jardines del Sur': { x: 450, y: 400 },
    'Mirador Sur': { x: 550, y: 500 },
    'Mirador Norte': { x: 600, y: 50 },
    'Los Proceres': { x: 650, y: 100 },
    'San Carlos': { x: 350, y: 200 },
    'Villa Juana': { x: 250, y: 250 }
};

let currentLang = 'es';
let saveMode = false;
let favorites = [];
let currentSort = 'time';
let currentResults = [];
let selectedTransportFilter = 'all'; 

// ============================================
// INICIALIZACIÓN Y EVENTOS
// ============================================

function init() {
    loadFavoritesFromStorage();
    populateSelects(); 
    setupEventListeners();
    updateLanguage();
    loadFavoritesDisplay();
    // 💡 Ejecutar el cargador de modo ahorro/oscuro al inicio
    loadSaveModePreference(); 
    resetAppView(false);
}

function loadFavoritesFromStorage() {
    try {
        const stored = localStorage.getItem('favorites');
        favorites = stored ? JSON.parse(stored) : [];
    } catch (error) {
        favorites = [];
    }
}

function saveFavoritesToStorage() {
    try {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
        // Handle error
    }
}

function populateSelects() {
    const originSelect = document.getElementById('origin');
    const destSelect = document.getElementById('destination');
    
    // Añadir opción vacía inicial
    originSelect.add(new Option('Selecciona un origen', ''), 0);
    destSelect.add(new Option('Selecciona un destino', ''), 0);

    locations.forEach(loc => {
        originSelect.add(new Option(loc, loc));
        destSelect.add(new Option(loc, loc));
    });
}

function setupEventListeners() {
    document.getElementById('routeForm').addEventListener('submit', handleSearch);
    
    ['alert-rain', 'alert-rush', 'alert-strike'].forEach(id => {
        document.getElementById(id).addEventListener('change', handleAlertChange);
    });
    
    document.querySelectorAll('.btn--sort').forEach(btn => {
        btn.addEventListener('click', handleSortChange);
    });
    
    document.getElementById('saveModeBtn').addEventListener('click', toggleSaveMode); 
    
    document.getElementById('langToggle').addEventListener('click', toggleLanguage);
    document.getElementById('transportFilter').addEventListener('change', handleTransportFilterChange);
    document.getElementById('newSearchBtn').addEventListener('click', () => resetAppView(true));
}

function handleAlertChange(e) {
    const alertType = e.target.id.replace('alert-', '');
    alerts[alertType].active = e.target.checked;
    
    if (currentResults.length > 0) {
        const origin = document.getElementById('origin').value;
        const destination = document.getElementById('destination').value;
        searchRoutes(origin, destination);
    }
}

function handleTransportFilterChange(e) {
    selectedTransportFilter = e.target.value;

    if (document.getElementById('resultsSection').style.display === 'block') {
        const origin = document.getElementById('origin').value;
        const destination = document.getElementById('destination').value;
        if (origin && destination && origin !== destination) {
             searchRoutes(origin, destination);
        }
    }
}

function handleSortChange(e) {
    currentSort = e.currentTarget.dataset.sort;
    updateSortButtons();
    sortAndDisplayResults();
}

function handleSearch(e) {
    e.preventDefault();
    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;

    if (!origin || !destination) {
        alert(translations[currentLang].selectOriginDest);
        return;
    }
    
    if (origin === destination) {
        alert(translations[currentLang].differentLocations);
        return;
    }

    document.getElementById('searchCard').style.display = 'none';
    document.getElementById('howItWorksCard').style.display = 'none';

    searchRoutes(origin, destination);
}

function resetAppView(clearSelects = true) {
    document.getElementById('resultsSection').style.display = 'none';
    document.getElementById('mapContainer').style.display = 'none';
    
    document.getElementById('searchCard').style.display = 'block';
    document.getElementById('howItWorksCard').style.display = 'block';

    if (clearSelects) {
        document.getElementById('origin').value = '';
        document.getElementById('destination').value = '';
        document.getElementById('transportFilter').value = 'all';
    }

    currentResults = [];
    currentSort = 'time';
    updateSortButtons();
}

// ============================================
// BÚSQUEDA Y CÁLCULO DE RUTAS (SIN DIJKSTRA)
// ============================================

function searchRoutes(origin, destination) {
    const foundRoutes = findRoutes(origin, destination);
    currentResults = foundRoutes;
    displayResults(foundRoutes);
    drawMap(origin, destination, foundRoutes); 
}

function findRoutes(origin, destination) {
    let allowedTypes = [];
    if (selectedTransportFilter === 'all') {
        allowedTypes = Object.keys(transportTypes).filter(t => t !== 'combinado'); 
    } else {
        allowedTypes = [selectedTransportFilter];
    }
    
    const segmentFilter = (route) => allowedTypes.includes(route.type);

    // 1. Buscar rutas directas (0 transbordos)
    const directRoutes = routes
        .filter(route => route.from === origin && route.to === destination && segmentFilter(route))
        .map(route => ({
            type: route.type, 
            from: origin,
            to: destination,
            segments: [route],
            transfers: 0,
            ...calculateRoute([route])
        }));

    // 2. Buscar rutas con 1 transbordo
    const transferRoutes = [];
    const firstLegs = routes
        .filter(route => route.from === origin && segmentFilter(route));
    
    firstLegs.forEach(firstRoute => {
        // El transbordo NO puede ser en el destino ni volver al origen
        if (firstRoute.to === destination || firstRoute.to === origin) return; 

        const secondLegs = routes
            .filter(route => route.from === firstRoute.to && route.to === destination && segmentFilter(route));
        
        secondLegs.forEach(secondRoute => {
            transferRoutes.push({
                type: 'combinado', 
                from: origin,
                to: destination,
                segments: [firstRoute, secondRoute],
                transfers: 1,
                ...calculateRoute([firstRoute, secondRoute])
            });
        });
    });

    const allRoutes = [...directRoutes, ...transferRoutes];
    
    return sortRoutes(allRoutes, currentSort);
}

function calculateRoute(segments) {
    // FORMULA 1: Tiempo base de ruta = suma tiempo_min de tramos.
    let baseTime = segments.reduce((sum, s) => sum + s.time, 0);
    // FORMULA 3: Costo total = suma de costo
    let baseCost = segments.reduce((sum, s) => sum + s.cost, 0);

    let totalTime = baseTime;
    let totalCost = baseCost;

    // FORMULA 2: Por cada condición activa: tiempo = tiempo * (1 + tiempo_pct/100).
    if (alerts.rain.active) {
        totalTime *= (1 + alerts.rain.timePct / 100);
    }
    if (alerts.rush.active) {
        totalTime *= (1 + alerts.rush.timePct / 100);
    }
    if (alerts.strike.active) {
        totalTime *= (1 + alerts.strike.timePct / 100);
        // FORMULA 3: ... + suma de costo_extra de condiciones.
        totalCost += alerts.strike.costExtra;
    }

    return { 
        time: Math.round(totalTime), // Redondear al minuto
        cost: Math.round(totalCost)
    };
}

function sortRoutes(routes, sortBy) {
    return [...routes].sort((a, b) => {
        switch(sortBy) {
            case 'cost': 
                return a.cost - b.cost;
            case 'transfers': 
                return a.transfers - b.transfers;
            case 'time': // Ranking: por defecto ordena por tiempo total
            default: 
                return a.time - b.time;
        }
    });
}

function updateSortButtons() {
    document.querySelectorAll('.btn--sort').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.sort === currentSort);
    });
    const newSearchBtn = document.getElementById('newSearchBtn');
    if (newSearchBtn) {
        newSearchBtn.textContent = translations[currentLang].newSearch;
    }
}

function sortAndDisplayResults() {
    if (currentResults.length > 0) {
        const sortedRoutes = sortRoutes(currentResults, currentSort);
        displayResults(sortedRoutes);
    }
}

// ============================================
// FAVORITOS Y LENGUAJE
// ============================================

function isFavorite(route) {
    const routeString = JSON.stringify(route.segments.map(s => `${s.from}-${s.to}-${s.type}`));
    return favorites.includes(routeString);
}

function toggleFavorite(route) {
    const routeString = JSON.stringify(route.segments.map(s => `${s.from}-${s.to}-${s.type}`));
    const index = favorites.indexOf(routeString);
    
    if (index === -1) {
        favorites.push(routeString);
    } else {
        favorites.splice(index, 1);
    }
    
    saveFavoritesToStorage();
    // Vuelve a dibujar la sección de resultados para actualizar los iconos
    if (currentResults.length > 0) {
        sortAndDisplayResults();
    }
    loadFavoritesDisplay();
}

function loadFavoritesDisplay() {
    const container = document.getElementById('favoritesContainer');
    if (!container) return; 

    // Mapear las rutas favoritas (el proceso de deserializar es más complejo 
    // pero para mostrar un placeholder o una lista simple, podemos usar los segmentos).
    if (favorites.length === 0) {
        container.innerHTML = `<div class="empty-state">${translations[currentLang].noFavorites}</div>`;
        return;
    }
    
    // Dejar un placeholder simple ya que la ruta completa y el cálculo de costo
    // de favoritos puede ser complejo de manejar aquí sin el objeto route completo.
    container.innerHTML = `<div class="empty-state">Función de visualización avanzada no implementada. <br>Favoritos guardados: ${favorites.length}</div>`;
}

function updateLanguage() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (translations[currentLang][key]) {
            el.innerHTML = translations[currentLang][key];
        }
    });
    
    // Actualizar labels de alertas
    if (document.getElementById('rain-label')) {
         document.getElementById('rain-label').innerHTML = translations[currentLang].rain;
    }
    if (document.getElementById('rush-label')) {
        document.getElementById('rush-label').innerHTML = translations[currentLang].rush;
    }
    if (document.getElementById('strike-label')) {
        document.getElementById('strike-label').innerHTML = translations[currentLang].strike;
    }
    
    // Actualizar textos dinámicos
    updateSortButtons();
}

function toggleLanguage() {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    document.getElementById('langToggle').textContent = currentLang === 'es' ? 'EN' : 'ES';
    updateLanguage();
    // Si hay resultados, volver a renderizar
    if (currentResults.length > 0) {
        sortAndDisplayResults();
    }
    loadFavoritesDisplay();
}

// ============================================
// RENDERIZADO DE RESULTADOS
// ============================================

function createRouteCard(route) {
    const { time, cost, segments, transfers } = route;
    const type = route.type;
    const transport = transportTypes[type];
    const isFav = isFavorite(route) ? '★' : '☆';

    let segmentsHTML = '';
    
    segments.forEach((segment, index) => {
        const segmentType = transportTypes[segment.type];
        const isTransfer = index > 0;
        
        segmentsHTML += `
            <div class="route-segment" style="border-left-color: ${segmentType.color};">
                ${isTransfer ? `<p class="transfer-label">🔄 ${translations[currentLang].transportCombinado} en <strong>${segment.from}</strong></p>` : ''}
                <p>
                    <span class="transport-icon">${segmentType.icon}</span> 
                    ${segmentType.name}: ${segment.from} → ${segment.to} 
                    <span class="segment-details">(${segment.time} min / RD$${segment.cost})</span>
                </p>
            </div>
        `;
    });

    return `
        <div class="route-card" data-time="${time}" data-cost="${cost}" data-transfers="${transfers}">
            <div class="route-header">
                <span class="route-icon" style="background-color: ${transport.color};">${transport.icon}</span>
                <div class="route-summary">
                    <h3>${transport.name} ${transfers > 0 ? `(${transfers} Transbordo${transfers > 1 ? 's' : ''})` : '(Directo)'}</h3>
                    <p class="route-main-data">
                        ⏱️ ${time} min | 💰 RD$${cost}
                    </p>
                </div>
                <button class="btn--fav" onclick="toggleFavorite(${JSON.stringify(route).replace(/"/g, "'")})">${isFav}</button>
            </div>
            <div class="route-details">
                ${segmentsHTML}
            </div>
        </div>
    `;
}

function displayResults(foundRoutes) {
    const container = document.getElementById('routesContainer');
    const section = document.getElementById('resultsSection');

    if (foundRoutes.length === 0) {
        container.innerHTML = `<div class="empty-state">${translations[currentLang].noRoutesFound}</div>`;
        section.style.display = 'block';
        return;
    }

    container.innerHTML = foundRoutes.map(route => createRouteCard(route)).join('');
    section.style.display = 'block';
}

// ============================================
// MAPA (VISUALIZACIÓN SIMPLE)
// ============================================

function drawMap(origin, destination, routes) {
    const mapContainer = document.getElementById('mapContainer');
    const canvas = document.getElementById('routeMapCanvas');
    if (!canvas || !mapContainer) return;

    const ctx = canvas.getContext('2d');
    const width = 800;
    const height = 550;
    canvas.width = width;
    canvas.height = height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Configuración para el modo ahorro/oscuro
    const isDarkMode = saveMode;
    const nodeColor = isDarkMode ? '#fff' : '#333';
    const textColor = isDarkMode ? '#ccc' : '#666';
    const activeRouteColor = '#8b5cf6'; // Color morado para la ruta principal

    // --- 1. Dibujar todos los nodos (Barrios) ---
    ctx.fillStyle = nodeColor;
    ctx.font = '10px Arial';
    locations.forEach(loc => {
        const pos = nodePositions[loc];
        // Círculo del nodo
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 4, 0, Math.PI * 2);
        ctx.fill();

        // Nombre del barrio
        ctx.fillStyle = textColor;
        ctx.fillText(loc, pos.x + 6, pos.y + 4);
        ctx.fillStyle = nodeColor; // Reset color
    });

    // --- 2. Dibujar la ruta más corta (o la primera encontrada) ---
    if (routes.length > 0) {
        const bestRoute = routes[0]; // Muestra la primera ruta (la mejor según el orden actual)
        
        ctx.lineWidth = 2;
        ctx.strokeStyle = activeRouteColor;
        
        bestRoute.segments.forEach((segment, index) => {
            const startPos = nodePositions[segment.from];
            const endPos = nodePositions[segment.to];

            if (startPos && endPos) {
                // Dibujar línea
                ctx.beginPath();
                ctx.moveTo(startPos.x, startPos.y);
                ctx.lineTo(endPos.x, endPos.y);
                ctx.stroke();

                // Destacar nodos de transbordo (si aplica)
                if (index < bestRoute.segments.length - 1) {
                    ctx.fillStyle = 'red'; // Color diferente para transbordo
                    ctx.beginPath();
                    ctx.arc(endPos.x, endPos.y, 6, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        });

        // --- 3. Destacar Origen y Destino ---
        [origin, destination].forEach((loc, index) => {
            const pos = nodePositions[loc];
            const color = index === 0 ? 'green' : 'red';
            
            ctx.fillStyle = color;
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 1.5;

            ctx.beginPath();
            ctx.arc(pos.x, pos.y, 8, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        });
    }

    mapContainer.style.display = 'block';
}

// ============================================
// MODO AHORRO (DARK MODE)
// ============================================

function toggleSaveMode() {
    saveMode = !saveMode;
    document.body.classList.toggle('dark-mode', saveMode);
    localStorage.setItem('saveMode', saveMode ? 'true' : 'false');
    
    // Vuelve a dibujar el mapa con el nuevo tema
    if (document.getElementById('mapContainer').style.display === 'block') {
        const origin = document.getElementById('origin').value;
        const destination = document.getElementById('destination').value;
        drawMap(origin, destination, currentResults);
    }
}

function loadSaveModePreference() {
    const preference = localStorage.getItem('saveMode');
    saveMode = (preference === 'true');
    document.body.classList.toggle('dark-mode', saveMode);
    
    const toggleButton = document.getElementById('saveModeBtn');
    if (toggleButton) {
        toggleButton.classList.toggle('active', saveMode);
    }
}

// Iniciar la aplicación al cargar el DOM
document.addEventListener('DOMContentLoaded', init);