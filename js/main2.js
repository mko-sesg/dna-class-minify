class Main {
    #text = new Array();
    #show = false;
    primaryButton = "";
    secondaryButton = "";
    element = "";
    head1 = "";
    divs = "";
    buttons = "";
    img1 = "models/textures/Material_baseColor.png";
    img2 = "models/textures/Material_baseColor1.png";
    material="";

    constructor() {
        this.#text.push('Nucleotider. DNA er en spiral med to lange ydre "rør". <br>Disse er i virkeligheden organiske molekyler, som binder sig til base parrene.');
        this.#text.push('Base parrene er koblet ind som en del af Nucleotiderne (rør) og kan bestå af følgende muligheder:<br> Adenine (A), som kun kan binde sig til Thymine (T) eller Guanine (G), som kun kan binde sig til Cytosine (C).<br> F.eks AT eller TA og GC eller CG.');
        this.#text.push('I en DNA mutation, som f.eks sker under en celledeling, hvor DNA skal kopieres kan fejlen være, at der byttes om på nogle af base parrerne.<br> F.eks at AT ændres til TA. Klik på knappen under modellen for at se en mutation<br>');
    }
    setDivsVisibility() {
        this.divs.forEach(div => {
            div.style.display = "none";
        });
    }
    setButtonsHotspots() {
        this.buttons = document.querySelectorAll('.Hotspot');
    }
    setHotspotbuttonslistener() {
        this.buttons.forEach(button => {
            button.addEventListener('click', () => {
                let id = button.id;
                if (this.#show) {
                    this.divs.forEach(div => {
                        let s=div.id[div.id.length-1];                        
                        if (s==id) {
                            div.style.display = "none";                            
                        }
                    });
                    this.#show = false;
                }else {
                    this.divs.forEach(div => {
                        let s=div.id[div.id.length-1];                        
                        if (s==id) {
                            div.style.backgroundColor = 'white';
                            div.style.color = 'black';
                            div.style.width = '200px';
                            div.innerHTML = this.#text[id-1];
                            div.style.display = "block";                            
                        }
                    });
                    this.#show = true;
                }                
            });
        });
    }
    mycreateAndApplyTexture = async (channel, data) =>{
        const texture = await this.element.createTexture(data);
        this.material.pbrMetallicRoughness[channel].setTexture(texture);
    }
    setElementListener() {
        this.element.addEventListener('load', () => {
            this.material = this.element.model.materials[0];
            this.primaryButton.addEventListener('click', () => {
                this.head1.textContent = "DNA";
                this.mycreateAndApplyTexture('baseColorTexture', this.img1);});
 
            this.secondaryButton.addEventListener('click', () => {
                this.head1.textContent = "Muteret DNA";
                this.mycreateAndApplyTexture('baseColorTexture', this.img2); });
        });
    }
}
const main = new Main();
window.addEventListener('DOMContentLoaded', (event) => {
    main.primaryButton = document.getElementById('primaryButton');
    main.secondaryButton = document.getElementById('secondaryButton');
    main.element = document.getElementById("mv1");
    main.head1 = document.getElementById("myhead");
    main.divs = document.querySelectorAll('.HotspotAnnotation');
    main.setDivsVisibility();
    main.setButtonsHotspots();
    main.setHotspotbuttonslistener();
    main.setElementListener();});
