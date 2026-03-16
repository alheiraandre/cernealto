/**
 * CERNE - Lógica Principal de UI
 */

document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // MENU OVERLAY
    // ==========================================
    const menuToggle = document.getElementById('menuToggle');
    const fullScreenMenu = document.getElementById('fullScreenMenu');
    const navbar = document.getElementById('navbar');

    if (menuToggle && fullScreenMenu && navbar) {
        menuToggle.addEventListener('click', () => {
            const isActive = fullScreenMenu.classList.toggle('active');
            navbar.classList.toggle('menu-open');
            
            if (isActive) {
                window.lenis && window.lenis.stop();
                navbar.style.color = '#ffffff'; 
            } else {
                window.lenis && window.lenis.start();
                navbar.style.color = 'var(--nav-text)';
            }
        });

        document.querySelectorAll('.menu-link').forEach(link => {
            link.addEventListener('click', () => {
                fullScreenMenu.classList.remove('active');
                navbar.classList.remove('menu-open');
                window.lenis && window.lenis.start();
                navbar.style.color = 'var(--nav-text)';
            });
        });
    }

    // ==========================================
    // LÓGICA DE MODAIS
    // ==========================================
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal-overlay');
    const closeBtns = document.querySelectorAll('.modal-close');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault(); 
            const modalId = trigger.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('active');
                window.lenis && window.lenis.stop(); 
            }
        });
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal-overlay');
            if(modal) {
                modal.classList.remove('active');
                window.lenis && window.lenis.start(); 
            }
        });
    });

    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                window.lenis && window.lenis.start();
            }
        });
    });

    // ==========================================
    // SCROLL UP / DOWN BOTOES
    // ==========================================
    const scrollUpBtn = document.getElementById('scrollUpBtn');
    const scrollDownBtn = document.getElementById('scrollDownBtn');

    if (scrollUpBtn && scrollDownBtn) {
        scrollUpBtn.addEventListener('click', () => {
            window.lenis && window.lenis.scrollTo(0, { duration: 1.5 });
        });
        
        scrollDownBtn.addEventListener('click', () => {
            window.lenis && window.lenis.scrollTo(document.body.scrollHeight, { duration: 1.5 });
        });
    }

    // ==========================================
    // CHATBOT CONVERSACIONAL (Estilo Dra. Elcidia)
    // ==========================================
    const chatToggle   = document.getElementById('chatbot-toggle');
    const chatWindow   = document.getElementById('chatbot-window');
    const chatCloseBtn = document.getElementById('chatbot-close');
    const chatInput    = document.getElementById('chat-input');
    const chatSendBtn  = document.getElementById('chat-send');
    const messagesEl   = document.getElementById('chat-messages');

    const openChat = () => {
        chatWindow.classList.remove('hidden-chat');
        chatToggle.setAttribute('aria-expanded', 'true');
        chatInput?.focus();
        const sugestoes = document.getElementById('chat-suggestions');
        if (sugestoes) sugestoes.style.display = 'flex';
    };

    const closeChat = () => {
        chatWindow.classList.add('hidden-chat');
        chatToggle.setAttribute('aria-expanded', 'false');
    };

    chatToggle?.addEventListener('click', () => {
        chatWindow.classList.contains('hidden-chat') ? openChat() : closeChat();
    });
    chatCloseBtn?.addEventListener('click', closeChat);

    const appendMessage = (text, sender) => {
        const div = document.createElement('div');
        div.classList.add('chat-bubble');
        
        if (sender === 'user') {
            div.classList.add('user-bubble');
            div.textContent = text; 
        } else {
            div.classList.add('bot-bubble');
            div.innerHTML = text; 
        }
        
        messagesEl.appendChild(div);
        messagesEl.scrollTop = messagesEl.scrollHeight;
        return div;
    };

    const setChatLoading = (loading) => {
        chatInput.disabled  = loading;
        chatSendBtn.disabled = loading;
        chatSendBtn.style.opacity = loading ? '0.5' : '1';
    };

    // Base de Dados com Palavras-Chave (Adaptada para a CERNE)
    const faqBase = [
        { 
            palavras: ['marketing', 'digital', 'performance', 'cac', 'vendas', 'tráfego'], 
            resposta: 'O nosso serviço de <strong>Marketing Digital</strong> é focado em performance real. Analisamos dados para otimizar o seu Custo de Aquisição (CAC) e maximizar o ROI.' 
        },
        { 
            palavras: ['processos', 'logística', 'supply chain', 'financeiro', 'back-office', 'custos'], 
            resposta: 'Na <strong>Consultoria de Processos</strong>, o Valderi e o Felipe mapeiam gargalos invisíveis no seu back-office, otimizando finanças e operações para garantir escala segura.' 
        },
        { 
            palavras: ['mentoria', 'c-level', 'diretor', 'ceo', 'líder', 'decisão'], 
            resposta: 'A <strong>Mentoria C-Level</strong> com o André Oliveira é um espaço confidencial para líderes alinharem visão sistémica e tomarem decisões baseadas em dados seguros.' 
        },
        { 
            palavras: ['preço', 'valor', 'custa', 'orçamento', 'proposta'], 
            resposta: 'Os nossos serviços são 100% personalizados após um diagnóstico da sua operação. Gostaria de agendar uma avaliação estratégica sem compromisso?' 
        },
        { 
            palavras: ['contato', 'reunião', 'agendar', 'falar', 'telefone'], 
            resposta: 'Pode entrar em contato direto através do nosso WhatsApp ou preenchendo o formulário no rodapé do site.' 
        },
        { 
            palavras: ['sócios', 'equipe', 'time', 'quem são'], 
            resposta: 'A CERNE é formada por André Oliveira (Estratégia e Dados), Valderi Santana (Finanças) e Felipe Argollo (Supply Chain).' 
        }
    ];

    const sendMessage = () => {
        const text = chatInput.value.trim();
        if (!text) return;

        appendMessage(text, 'user');
        chatInput.value = '';
        setChatLoading(true);

        // Indicador de digitação
        const typing = document.createElement('div');
        typing.className = 'chat-bubble bot-bubble animate-pulse';
        typing.style.fontSize = '0.75rem';
        typing.textContent = 'A processar...';
        messagesEl.appendChild(typing);
        messagesEl.scrollTop = messagesEl.scrollHeight;

        setTimeout(() => {
            typing.remove();
            
            const textoMinusculo = text.toLowerCase();
            let respostaFinal = "";

            // Procura correspondência
            for (const item of faqBase) {
                const achouPalavra = item.palavras.some(palavra => textoMinusculo.includes(palavra));
                if (achouPalavra) {
                    respostaFinal = `${item.resposta}<br><br>
                    <a href="https://wa.me/5521974677754" target="_blank" style="color: #1EAB52; font-weight: bold; text-decoration: none; display: inline-block; margin-top: 10px;">
                       👉 Agendar Reunião
                    </a>`;
                    break; 
                }
            }

            // Fallback se não encontrar
            if (respostaFinal === "") {
                respostaFinal = `Não encontrei uma resposta exata para a sua dúvida, mas a nossa equipa de consultores está pronta para ajudar!<br><br>
                <a href="https://wa.me/5521974677754?text=Ol%C3%A1%2C%20estou%20no%20site%20da%20CERNE%20e%20gostaria%20de%20saber%20sobre%3A%20${encodeURIComponent(text)}" 
                   target="_blank" 
                   style="display: block; background: #25D366; color: white; padding: 10px; border-radius: 8px; text-align: center; text-decoration: none; font-weight: bold; margin-top: 10px;">
                   Conversar no WhatsApp
                </a>`;
            }
            
            appendMessage(respostaFinal, 'bot');
            setChatLoading(false);
            chatInput.focus();
        }, 1200); 
    };

    chatSendBtn?.addEventListener('click', sendMessage);
    chatInput?.addEventListener('keydown', e => { 
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } 
    });

    // Botões de Sugestão
    document.querySelectorAll('.suggestion-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            chatInput.value = btn.textContent;
            sendMessage(); 
            // Esconde sugestões após a primeira escolha
            const container = document.getElementById('chat-suggestions');
            if(container) container.style.display = 'none';
        });
    });

    // Fechar no Esc
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && !chatWindow.classList.contains('hidden-chat')) {
            closeChat();
        }
    });
});