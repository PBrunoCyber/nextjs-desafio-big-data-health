/* eslint-disable @next/next/no-img-element */
import CardCategory from "@/components/atoms/CardCategory";
import LinkButton from "@/components/atoms/LinkButton";
import Footer from "@/components/molecules/Footer";
import NavBar from "@/components/molecules/NavBar";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <div>
      <NavBar />
      <Box className="relative flex flex-col gap-[70px] py-[100px] items-center justify-center p-[10px]">
        <Box className="flex flex-col items-center gap-[20px]">
          <h1 className="font-bold font-primary text-[40pt] text-center leading-[4rem]">Bem-vindo à nossa loja online</h1>
          <p className="font-secondary text-center">Encontre as últimas tendências em roupas, jóias, eletrônicos e muito mais.</p>
          <LinkButton variant="contained" className="w-[240px] text-center" href="/explorar">
            <p className="font-primary text-center">Ver Produtos</p>
          </LinkButton>
        </Box>
        <img src="/images/shop-cart.png" width={1200} height={40} alt="" className="rounded-[20px]" />
        <Box maxWidth={'1200px'} className="mt-[20px] w-full flex flex-wrap justify-between">
          <Box>
            <p className="font-primary">Conveniência</p>
            <h1 className="font-primary font-bold">Benefícios Exclusivos para Você</h1>
          </Box>
          <Box className="max-w-[500px] flex flex-col gap-[20px]">
            <p className="font-primary">Na nossa loja, você aproveita frete grátis, devoluções fáceis e um atendimento ao cliente disponível 24/7. Compre com tranquilidade e comodidade.</p>
            <LinkButton variant="outlined" className="max-w-[200px] text-center" href="/explorar">Saiba Mais</LinkButton>
          </Box>

        </Box>
        <Box maxWidth={"1200px"} className="bg-[#ddd] rounded-[20px] flex flex-col gap-[20px] items-center w-full px-[10px] py-[40px]">
          <h1 className="font-primary font-bold max-w-[500px] text-center">Apresentação das categorias de produtos</h1>
          <Box className="flex gap-[20px] items-center justify-center flex-wrap">
          <CardCategory
            title="Roupas Masculinas"
            description="Encontre uma variedade de roupas masculinas para todos os estilos e ocasiões."
            src="/images/man.jpg"
            href="/explorar?category=Men's clothes"
          />
          <CardCategory
            title="Roupas Femininas"
            description="Descubra uma ampla seleção de roupas femininas para todas as idades e gostos."
            src="/images/woman.png"
            href="/explorar?category=Men's clothes"
          />
          <CardCategory
            title="Jóias"
            description="Explore nossa coleção de joias elegantes e sofisticadas para complementar seu estilo."
            src="/images/joias.png"
            href="/explorar?category=Men's clothes"
          />
          </Box>
        </Box>
      </Box>
      <Footer/>
    </div>
  );
}
