// Menu toggle function
function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

// Scroll animation for timeline items
function handleTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-content');
    const triggerBottom = window.innerHeight * 0.8;

    timelineItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;

        if (itemTop < triggerBottom) {
            item.classList.add('visible');
        } else {
            item.classList.remove('visible');
        }
    });
}

// Add scroll event listener
window.addEventListener('scroll', handleTimelineAnimation);
// Initial check for visible items
window.addEventListener('load', handleTimelineAnimation);

// Project data
const projectData = {
    project1: {
        title: 'Best View to Place Categorization (BVPC)',
        description: 'Efficient semantic place categorization by a robot through active line-of-sight selection. This work presents a novel approach for robots to efficiently categorize places by actively selecting optimal viewpoints, improving the accuracy and efficiency of place recognition tasks.',
        paper: 'https://mapir.uma.es/papersrepo/2021/2021_matez_KBS_semantic_place_categorization.pdf',
        type: 'image',
        media: './assets/projects/place_categorization.jpg',
        bibtex: `@article{matez2021efficient,
  title={Efficient semantic place categorization by a robot through active line-of-sight selection},
  author={M{\'a}tez-Bandera, Jos{\'e}-Luis and Ruiz-Sarmiento, Jos{\'e}-Ra{\'u}l and Monroy, Javier and Gonz{\'a}lez-Jim{\'e}nez, Javier},
  journal={Knowledge-Based Systems},
  volume={219},
  pages={106889},
  year={2021},
  publisher={Elsevier}
}`
    },
    project2: {
        title: 'LTC Mapping',
        description: 'Long-term consistency of object-oriented semantic maps in robotics. A novel approach to maintain and update semantic maps over time, ensuring consistency and reliability in long-term robot operation.',
        github: 'https://github.com/MAPIRlab/LTC-Mapping',
        paper: 'https://mapir.uma.es/papersrepo/2022/2022_matez_LTCmapping.pdf',
        type: 'image',
        media: './assets/projects/ltc_mapping.jpg',
        bibtex: `@article{matez2022ltc,
  title={LTC-Mapping: Enhancing long-term consistency of object-oriented semantic maps in robotics},
  author={M{\'a}tez-Bandera, Jos{\'e}-Luis and Fern{\'a}ndez-Chaves, David and Ruiz-Sarmiento, Jos{\'e}-Ra{\'u}l and Monroy, Javier and Petkov, Nicolai and Gonz{\'a}lez-Jim{\'e}nez, Javier},
  journal={Sensors},
  volume={22},
  number={14},
  pages={5402},
  year={2022},
  publisher={MDPI}
}`
    },
    project3: {
        title: 'Sigma-FP',
        description: 'Robot Mapping of 3D Floor Plans with an RGB-D Camera under Uncertainty. A system for creating accurate 3D floor plans while accounting for measurement uncertainties, improving the reliability of architectural mapping.',
        github: 'https://github.com/MAPIRlab/sigma-fp',
        paper: 'https://riuma.uma.es/xmlui/bitstream/handle/10630/26928/2022_matez_RAL_sigmaFP.pdf?sequence=1',
        type: 'youtube',
        media: '7aaD1H4IXb8',
        bibtex: `@article{matez2022sigma,
  title={Sigma-FP: Robot mapping of 3D floor plans with an RGB-D camera under uncertainty},
  author={M{\'a}tez-Bandera, Jos{\'e}-Luis and Monroy, Javier and Gonz{\'a}lez-Jim{\'e}nez, Javier},
  journal={IEEE Robotics and Automation Letters},
  volume={7},
  number={4},
  pages={12539--12546},
  year={2022},
  publisher={IEEE}
}`
    },
    project4: {
        title: 'Voxeland',
        description: 'Probabilistic Instance-Aware Semantic Mapping with Evidence-based Uncertainty Quantification. A novel framework for building semantic maps with uncertainty estimation, improving the robustness of scene understanding for mobile robots.',
        github: 'https://github.com/MAPIRlab/Voxeland',
        paper: 'https://arxiv.org/pdf/2411.08727',
        type: 'video',
        media: './assets/videos/voxeland_map.mp4',
        bibtex: `@article{matez2024voxeland,
  title={Voxeland: Probabilistic Instance-Aware Semantic Mapping with Evidence-based Uncertainty Quantification},
  author={M{\'a}tez-Bandera, Jos{\'e}-Luis and Ojeda, Pepe and Monroy, Javier and Gonz{\'a}lez-Jim{\'e}nez, Javier and Ruiz-Sarmiento, Jos{\'e}-Ra{\'u}l},
  journal={arXiv preprint arXiv:2411.08727},
  year={2024}
}`
    }
};

let players = {};

// Initialize YouTube players for preview
function initializeYouTubePreview() {
    // Load YouTube API if not already loaded
    if (!window.YT && !document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    document.querySelectorAll('.preview-youtube').forEach(container => {
        const videoId = container.dataset.youtubeId;
        if (!videoId) return;

        // Create a div for the player
        const playerDiv = document.createElement('div');
        playerDiv.id = `youtube-${videoId}`;
        container.innerHTML = '';
        container.appendChild(playerDiv);

        // Initialize player if API is ready
        if (window.YT && window.YT.Player) {
            createPlayer(videoId, playerDiv.id);
        }
    });
}

function createPlayer(videoId, containerId) {
    players[videoId] = new YT.Player(containerId, {
        videoId: videoId,
        playerVars: {
            autoplay: 0,
            controls: 0,
            mute: 1,
            loop: 1,
            playlist: videoId,
            modestbranding: 1,
            showinfo: 0,
            rel: 0,
            enablejsapi: 1,
            origin: window.location.origin
        },
        events: {
            onReady: (event) => {
                const card = document.querySelector(`[data-youtube-id="${videoId}"]`).closest('.project-card');
                
                card.addEventListener('mouseenter', () => {
                    event.target.playVideo();
                });
                
                card.addEventListener('mouseleave', () => {
                    event.target.pauseVideo();
                    event.target.seekTo(0);
                });
            }
        }
    });
}

// YouTube API callback
window.onYouTubeIframeAPIReady = function() {
    document.querySelectorAll('.preview-youtube').forEach(container => {
        const videoId = container.dataset.youtubeId;
        if (!videoId) return;
        
        const playerDiv = container.querySelector(`div[id^="youtube-"]`);
        if (playerDiv) {
            createPlayer(videoId, playerDiv.id);
        }
    });
};

// Call on page load
document.addEventListener('DOMContentLoaded', initializeYouTubePreview);

// Reinitialize when modal content changes
const modal = document.querySelector('.project-modal');
const observer = new MutationObserver(() => {
    const modalYouTube = modal.querySelector('.preview-youtube');
    if (modalYouTube) {
        initializeYouTubePreview();
    }
});
observer.observe(modal, { childList: true, subtree: true });

// Project video hover functionality
document.querySelectorAll('.project-card').forEach(card => {
    const video = card.querySelector('.project-video');
    if (video) {
        // Load the video when the card is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.load();
                }
            });
        });
        observer.observe(card);

        card.addEventListener('mouseenter', () => {
            // Set video attributes for better mobile compatibility
            video.playsInline = true;
            video.muted = true;
            video.loop = true;
            
            // Try to play the video
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log('Video autoplay failed:', error);
                });
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (!video.paused) {
                video.pause();
                video.currentTime = 0;
            }
        });
    }
});

// Modal functionality
const modalContent = modal.querySelector('.modal-content');
const closeModalBtn = modal.querySelector('.close-modal');

function openModal(projectCard) {
    const projectId = projectCard.dataset.project;
    const project = projectData[projectId];
    
    // Update modal content
    document.querySelector('.modal-title').textContent = project.title;
    document.querySelector('.modal-description').textContent = project.description;
    
    // Update links
    const githubLink = document.querySelector('.github-link');
    if (project.github) {
        githubLink.href = project.github;
        githubLink.style.display = 'flex';
    } else {
        githubLink.style.display = 'none';
    }
    
    document.querySelector('.paper-link').href = project.paper;
    
    // Update media container
    const mediaContainer = document.querySelector('.modal-media-container');
    mediaContainer.innerHTML = '';
    
    switch (project.type) {
        case 'video':
            const video = document.createElement('video');
            video.src = project.media;
            video.controls = true;
            video.playsInline = true;
            video.muted = false; // Allow sound in modal
            video.autoplay = false; // Don't autoplay in modal
            video.style.backgroundColor = '#000';
            video.addEventListener('loadedmetadata', () => {
                video.style.opacity = '1';
            });
            mediaContainer.appendChild(video);
            break;
        case 'youtube':
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube.com/embed/${project.media}?rel=0&showinfo=0&modestbranding=1`;
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen = true;
            mediaContainer.appendChild(iframe);
            break;
        case 'image':
            const img = document.createElement('img');
            img.src = project.media;
            img.alt = project.title;
            mediaContainer.appendChild(img);
            break;
    }
    
    // Update citation
    document.querySelector('.bibtex-citation').textContent = project.bibtex;
    
    // Reset citation section state
    const citationToggle = document.querySelector('.citation-toggle');
    const citationSection = document.querySelector('.modal-citation');
    citationToggle.classList.remove('active');
    citationSection.classList.remove('active');
    citationToggle.querySelector('span').textContent = 'Show Citation';
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Add click event listeners for closing
    modal.addEventListener('click', handleModalClick);
    closeModalBtn.addEventListener('click', closeModal);
    document.addEventListener('keydown', handleEscKey);
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = ''; // Restore scrolling
    
    // Clear media container
    const mediaContainer = document.querySelector('.modal-media-container');
    mediaContainer.innerHTML = '';
    
    // Remove event listeners
    modal.removeEventListener('click', handleModalClick);
    closeModalBtn.removeEventListener('click', closeModal);
    document.removeEventListener('keydown', handleEscKey);
}

function handleModalClick(event) {
    // Close only if clicking outside the modal content
    if (event.target === modal) {
        closeModal();
    }
}

function handleEscKey(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
}

// Project card click handler
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', (e) => {
        // Don't open modal if clicking on a link
        if (e.target.closest('.project-link')) {
            return;
        }
        openModal(card);
    });
});

// Handle citation toggle
document.querySelector('.citation-toggle').addEventListener('click', () => {
    const toggle = document.querySelector('.citation-toggle');
    const citationSection = document.querySelector('.modal-citation');
    const toggleText = toggle.querySelector('span');
    
    toggle.classList.toggle('active');
    citationSection.classList.toggle('active');
    toggleText.textContent = toggle.classList.contains('active') ? 'Hide Citation' : 'Show Citation';
});

// Show toast notification
function showToast(message) {
    const toastContainer = document.querySelector('.toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    const icon = document.createElement('span');
    icon.className = 'icon';
    
    const text = document.createElement('span');
    text.textContent = message;
    
    toast.appendChild(icon);
    toast.appendChild(text);
    toastContainer.appendChild(toast);
    
    // Trigger reflow to enable transition
    toast.offsetHeight;
    toast.classList.add('show');
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toastContainer.removeChild(toast);
        }, 300);
    }, 3000);
}

// Handle citation button clicks
document.querySelectorAll('.cite-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = link.dataset.project;
        const bibtex = projectData[projectId].bibtex;
        
        // Create temporary textarea to copy text
        const textarea = document.createElement('textarea');
        textarea.value = bibtex;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        
        // Show modern toast notification
        showToast('BibTeX citation copied!');
    });
});

// Copy citation button in modal
document.querySelector('.copy-citation').addEventListener('click', () => {
    const bibtex = document.querySelector('.bibtex-citation').textContent;
    navigator.clipboard.writeText(bibtex).then(() => {
        // Show modern toast notification
        showToast('BibTeX citation copied!');
    });
});

// Handle media loading
function handleMediaLoading() {
    const mediaElements = document.querySelectorAll('.project-image-container img, .project-image-container video, .project-image-container iframe');
    
    mediaElements.forEach(element => {
        element.parentElement.classList.add('loading');
        
        const markAsLoaded = () => {
            element.classList.add('loaded');
            element.parentElement.classList.remove('loading');
        };

        if (element.complete || element.readyState >= 2) {
            markAsLoaded();
        } else {
            element.addEventListener('load', markAsLoaded);
            element.addEventListener('loadeddata', markAsLoaded);
        }
    });
}

// Call on page load
window.addEventListener('load', handleMediaLoading);

// Call when modal content changes
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('.project-modal');
    const observer = new MutationObserver(handleMediaLoading);
    observer.observe(modal, { childList: true, subtree: true });
});

// Handle YouTube videos
document.addEventListener('DOMContentLoaded', () => {
    const youtubeContainers = document.querySelectorAll('.preview-youtube');
    
    youtubeContainers.forEach(container => {
        const videoId = container.dataset.youtubeId;
        if (!videoId) return;

        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=0&mute=1&controls=0&loop=1&playlist=${videoId}&modestbranding=1&showinfo=0&rel=0`;
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;

        container.innerHTML = '';
        container.appendChild(iframe);

        const card = container.closest('.project-card');
        if (card) {
            card.addEventListener('mouseenter', () => {
                iframe.src = iframe.src.replace('autoplay=0', 'autoplay=1');
            });

            card.addEventListener('mouseleave', () => {
                iframe.src = iframe.src.replace('autoplay=1', 'autoplay=0');
            });
        }
    });
}); 