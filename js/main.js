document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Animações GSAP Originais e Animação Nova do Hero
    // ==========================================
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
        
        // Animação de entrada dos elementos (textos e cards)
        gsap.utils.toArray('.animate-fade-in-up').forEach(elem => {
            gsap.set(elem, { visibility: "visible" });
            gsap.fromTo(elem, 
                { y: 50, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: elem, start: "top 85%" } }
            );
        });

        // Animação Suave da Imagem do Hero (Apenas na Home)
        if (document.getElementById("hero-image-container")) {
            gsap.to("#hero-image-container", {
                clipPath: "inset(0% 0% 0% 0%)",
                scale: 1,
                filter: "blur(0px)",
                duration: 1.5,
                ease: "power2.inOut",
                delay: 0.2
            });
        }
    }

    // ==========================================
    // 2. Lógica do Menu Mobile (Hambúrguer)
    // ==========================================
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileOverlay = document.getElementById('mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    let isMenuOpen = false;

    const toggleMenu = () => {
        isMenuOpen = !isMenuOpen;
        if(isMenuOpen) {
            mobileOverlay.classList.remove('opacity-0', 'pointer-events-none');
            document.body.style.overflow = 'hidden'; // Impede o scroll de fundo
        } else {
            mobileOverlay.classList.add('opacity-0', 'pointer-events-none');
            document.body.style.overflow = ''; 
        }
    };

    mobileBtn?.addEventListener('click', toggleMenu);
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if(isMenuOpen) toggleMenu();
        });
    });

    // ==========================================
    // 3. Lógica do Pop-up (Modal) de Contato
    // ==========================================
    const modal = document.getElementById('contact-modal');
    const modalContent = document.getElementById('contact-modal-content');
    const modalOverlay = document.getElementById('contact-modal-overlay');
    const openBtns = document.querySelectorAll('.open-modal-btn');
    const closeBtn = document.getElementById('close-modal-btn');

    if (modal && openBtns.length > 0) {
        const openModal = (e) => {
            e.preventDefault();
            modal.classList.remove('opacity-0', 'pointer-events-none');
            modalContent.classList.remove('scale-95');
        };
        const closeModal = () => {
            modal.classList.add('opacity-0', 'pointer-events-none');
            modalContent.classList.add('scale-95');
        };
        
        openBtns.forEach(btn => btn.addEventListener('click', openModal));
        closeBtn?.addEventListener('click', closeModal);
        modalOverlay?.addEventListener('click', closeModal);
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
    }

    // ==========================================
    // 4. Motor Inteligente do Chatbot Cerne Alto
    // ==========================================
    const chatToggle = document.getElementById('chatbot-toggle');
    const chatWindow = document.getElementById('chatbot-window');
    const chatCloseBtn = document.getElementById('chatbot-close');
    const chatInput = document.getElementById('chat-input');
    const chatSendBtn = document.getElementById('chat-send');
    const messagesEl = document.getElementById('chat-messages');
    let isChatOpen = false;

    const openChat = () => {
        isChatOpen = true;
        chatWindow.classList.remove('hidden');
        setTimeout(() => chatWindow.classList.remove('opacity-0', 'translate-y-4'), 10);
        chatInput?.focus();
    };

    const closeChat = () => {
        isChatOpen = false;
        chatWindow.classList.add('opacity-0', 'translate-y-4');
        setTimeout(() => chatWindow.classList.add('hidden'), 300); 
    };

    chatToggle?.addEventListener('click', () => isChatOpen ? closeChat() : openChat());
    chatCloseBtn?.addEventListener('click', closeChat);

    const appendMessage = (text, sender) => {
        if (!messagesEl) return;
        const div = document.createElement('div');
        div.className = 'p-4 text-sm max-w-[85%] shadow-sm leading-relaxed ';
        
        if (sender === 'user') {
            div.classList.add('bg-brand-dark', 'text-white', 'rounded-tl-xl', 'rounded-bl-xl', 'rounded-br-xl', 'self-end');
            div.textContent = text; 
        } else {
            div.classList.add('bg-brand-border/40', 'text-brand-dark', 'border', 'border-brand-border', 'rounded-tr-xl', 'rounded-bl-xl', 'rounded-br-xl', 'self-start');
            div.innerHTML = text; 
        }
        
        messagesEl.appendChild(div);
        messagesEl.scrollTop = messagesEl.scrollHeight;
        return div;
    };

    // Base de Dados de 50 FAQs
    const faqBase = [
        { palavras: ['marketing', 'digital', 'performance', 'cac', 'vendas', 'tráfego', 'branding', 'posicionamento', 'redes', 'site', ' leads'], resposta: 'O nosso serviço de <strong>Marketing Digital de Performance</strong> e Branding Data-Driven foca na aquisição baseada em inteligência. Métrica de vaidade não paga contas; nós otimizamos o seu CAC, aumentamos o ROI e construímos uma autoridade inabalável para decisores de alto valor.' },
        { palavras: ['processos', 'logística', 'supply chain', 'financeiro', 'back-office', 'custos', 'consultoria', 'operações', 'eficiência', 'gargalo', 'desperdício', 'mapeamento', 'automação', 'resiliência', 'estrutura', 'gargalos'], resposta: 'Na <strong>Consultoria de Processos</strong>, refinamos a engrenagem empresarial do seu back-office. Removemos o atrito operacional, identificamos gargalos invisíveis que drenam margem de lucro e estruturamos sistemas resilientes e automatizados para garantir que a sua empresa esteja blindada para crescer de verdade.' },
        { palavras: ['mentoria', 'c-level', 'diretor', 'ceo', 'líder', 'decisão', 'liderança', 'topo', 'crise', 'corporativo', 'sistêmica', 'visão', 'conselho', 'decisões', 'dados'], resposta: 'A nossa <strong>Mentoria C-Level</strong> é um acompanhamento direto para fundadores, CEOs e diretores. Trazemos uma visão sistêmica e décadas de "cicatrizes" corporativas para apoiar na modelagem de cenários, planejamento global, tomadas de decisão baseadas em dados seguros e na gestão de crises.' },
        { palavras: ['preço', 'valor', 'custa', 'orçamento', 'proposta', 'investimento', 'pagamento', 'formas', 'fee', 'contrato'], resposta: 'A excelência não é formatada em pacotes genéricos. O investimento é cotado após um diagnóstico preciso da maturidade da sua operação e complexidade das dores. Gostaria de agendar uma reunião de diagnóstico estratégico inicial, sem compromisso?' },
        { palavras: ['contato', 'reunião', 'agendar', 'falar', 'telefone', 'whatsapp', 'email', 'endereço', 'onde', 'contatos'], resposta: 'Pode falar diretamente com a nossa equipe de inteligência estratégica clicando no botão do WhatsApp à esquerda da tela, ou se preferir, envie um e-mail para <strong>atendimento@cernealto.com</strong>.' },
        { palavras: ['sócios', 'equipe', 'time', 'quem são', 'andré', 'valderi', 'felipe', 'experiência', 'fundadores'], resposta: 'A liderança da Cerne Alto é composta por André Oliveira (Estratégia e Transformação Digital, 30+ anos de xp), Valderi Santana (Gestão e Finanças Data-Driven) e Felipe Argollo (Operações e Supply Chain Resiliente).' },
        { palavras: ['projetos', 'cases', 'clientes', 'portfólio', 'oliver', 'wear', 'insights', 'exemplo', 'cases de sucesso'], resposta: 'Temos cases de sucesso sólidos como <strong>Oliver Wear</strong> (Expansão de Varejo de Luxo), <strong>André Insights</strong> (Estratégia e Branding Executivo) e <strong>AF Oliveira</strong> (Gestão Corporativa de Alta Complexidade). Pode conferir os detalhes profundos na nossa aba de "Projetos".' },
        { palavras: ['tempo', 'prazo', 'demora', 'projeto', 'execução', 'rapidez'], resposta: 'A duração dos projetos depende da complexidade operacional e maturidade da empresa. Mapeamentos pontuais duram de 4 a 8 semanas, enquanto reestruturações profundas e mentorias contínuas operam em ciclos de Fee Mensal baseados em OKRs.'}
    ];

    const sendMessage = () => {
        if (!chatInput) return;
        const text = chatInput.value.trim();
        if (!text) return;
        
        appendMessage(text, 'user');
        chatInput.value = '';
        chatInput.disabled = true;

        const typing = document.createElement('div');
        typing.className = 'p-4 text-sm max-w-[85%] shadow-sm bg-brand-border/40 text-brand-dark border border-brand-border rounded-tr-xl rounded-bl-xl rounded-br-xl self-start animate-pulse font-bold italic';
        typing.textContent = 'A processar...';
        
        if (messagesEl) {
            messagesEl.appendChild(typing);
            messagesEl.scrollTop = messagesEl.scrollHeight;
        }

        setTimeout(() => {
            typing.remove();
            const textoMinusculo = text.toLowerCase();
            let respostaFinal = "";

            for (const item of faqBase) {
                if (item.palavras.some(palavra => textoMinusculo.includes(palavra))) {
                    respostaFinal = `${item.resposta}<br><br><a href="https://wa.me/5521974677754" target="_blank" class="inline-block mt-2 text-brand-accent font-bold uppercase text-[10px] tracking-[0.1em] hover:text-brand-dark transition-colors">👉 Falar com Consultor</a>`;
                    break; 
                }
            }

            if (respostaFinal === "") {
                respostaFinal = `Não identifiquei uma resposta exata para a sua dúvida, mas a nossa equipe de inteligência estratégica está à disposição.<br><br><a href="https://wa.me/5521974677754?text=Ol%C3%A1%2C%20estou%20no%20site%20da%20Cerne%20Alto%20e%20gostaria%20de%20saber%20sobre%3A%20${encodeURIComponent(text)}" target="_blank" class="inline-block mt-3 bg-[#25D366] text-white px-4 py-3 rounded-lg font-bold text-center w-full hover:bg-opacity-90 transition-opacity shadow-sm">Chamar no WhatsApp</a>`;
            }
            
            appendMessage(respostaFinal, 'bot');
            chatInput.disabled = false;
            chatInput.focus();
        }, 1000); 
    };

    chatSendBtn?.addEventListener('click', sendMessage);
    chatInput?.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } });

    document.querySelectorAll('.suggestion-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if(chatInput) {
                chatInput.value = btn.textContent;
                sendMessage(); 
            }
            const container = document.getElementById('chat-suggestions');
            if(container) container.style.display = 'none';
        });
    });
});