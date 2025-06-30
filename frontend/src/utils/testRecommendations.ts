/**
 * Test del algoritmo de recomendaciones
 * Este archivo es solo para testing y puede ser eliminado
 */

import { propertyService } from '@/services/propertyService';

export function testRecommendationAlgorithm() {
  console.log('🧪 Probando algoritmo de recomendaciones...');
  
  // Obtener una propiedad de prueba
  const allProperties = propertyService.getAllProperties();
  const testProperty = allProperties[0]; // Primera propiedad
  
  console.log('📍 Propiedad base:', {
    id: testProperty.id,
    titulo: testProperty.titulo,
    ciudad: testProperty.ciudad,
    tipo: testProperty.tipo,
    precio: testProperty.precio,
    ambientes: testProperty.ambientes
  });
  
  // Obtener recomendaciones
  const recommendations = propertyService.getRecommendations(testProperty, 5);
  
  console.log('🎯 Recomendaciones encontradas:');
  recommendations.forEach((rec, index) => {
    console.log(`${index + 1}. Score: ${rec.score}%`, {
      id: rec.property.id,
      titulo: rec.property.titulo,
      ciudad: rec.property.ciudad,
      tipo: rec.property.tipo,
      precio: rec.property.precio,
      ambientes: rec.property.ambientes,
      razones: rec.reasons
    });
    
    // Verificar que nunca supere 100%
    if (rec.score > 100) {
      console.error('❌ ERROR: Score superior a 100%!', rec.score);
    }
  });
  
  // Probar recomendaciones recíprocas
  if (recommendations.length > 0) {
    const firstRecommendation = recommendations[0];
    console.log('\n🔄 Probando recomendaciones recíprocas...');
    console.log('Obteniendo recomendaciones para:', firstRecommendation.property.titulo);
    
    const reciprocalRecs = propertyService.getRecommendations(
      firstRecommendation.property, 
      5, 
      testProperty.id // Pasar la propiedad original como "previous"
    );
    
    const hasReciprocal = reciprocalRecs.some(r => r.property.id === testProperty.id);
    
    if (hasReciprocal) {
      console.error('❌ ERROR: Recomendación recíproca detectada!');
    } else {
      console.log('✅ Correcto: No hay recomendaciones recíprocas');
    }
  }
  
  console.log('🏁 Test completado');
}

// Para usar temporalmente, descomenta esta línea:
// testRecommendationAlgorithm();
