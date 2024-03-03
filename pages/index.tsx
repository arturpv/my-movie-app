import { useEffect } from 'react';
import { useRouter } from 'next/router';

const IndexPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Redireciona para a página '/movies' ao acessar a rota padrão '/'
    router.push('/movies');
  }, []);

  // Renderização opcional, você pode adicionar conteúdo aqui se necessário

  return null; // Retorna null, pois o redirecionamento ocorre no useEffect
};

export default IndexPage;
