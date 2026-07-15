// =====================================
// FashionAI Image Processor
// =====================================

export function processImage(file){

    return new Promise((resolve,reject)=>{

        const reader=new FileReader();

        reader.onload=e=>{

            const img=new Image();

            img.onload=()=>{

                const canvas=document.createElement("canvas");

                const ctx=canvas.getContext("2d");

                const MAX=800;

                let width=img.width;
                let height=img.height;

                if(width>height){

                    if(width>MAX){

                        height*=MAX/width;
                        width=MAX;

                    }

                }else{

                    if(height>MAX){

                        width*=MAX/height;
                        height=MAX;

                    }

                }

                canvas.width=width;
                canvas.height=height;

                ctx.drawImage(img,0,0,width,height);

                resolve(canvas.toDataURL("image/jpeg",0.9));

            };

            img.src=e.target.result;

        };

        reader.onerror=reject;

        reader.readAsDataURL(file);

    });

}
