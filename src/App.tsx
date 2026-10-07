import Header from './components/Header'
import Hero from './components/Hero'
import Problems from './components/Problems'
import Applications from './components/Applications'
import Services from './components/Services'
import Demonstrations from './components/Demonstrations'
import Method from './components/Method'
import About from './components/About'
import Faq from './components/Faq'
import Diagnosis from './components/Diagnosis'
import Footer from './components/Footer'
import './styles/sections.css'

/* Estrutura da proposta de 07/10, em 9 blocos:
   1 Promessa · 2 Problemas · 3 Aplicações · 4 Serviços · 5 Demonstrações ·
   6 Método · 7 ResultX · 8 Perguntas · 9 Diagnóstico + formulário */
export default function App() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <Problems />
        <Applications />
        <Services />
        <Demonstrations />
        <Method />
        <About />
        <Faq />
        <Diagnosis />
      </main>
      <Footer />
    </>
  )
}
