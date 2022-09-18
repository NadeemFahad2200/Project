import tkinter as tk               
import requests                    
from tkinter import scrolledtext   
import tkinter.ttk as ttk1         


root=tk.Tk()                       
root.title("Latest news update using API in Python") 
root.geometry('1050x800')           
country_dict={                      
    'Argentina':'ar',
    'Australia': 'au',
    'Austria': 'at',
    'Belgium': 'be',
    'Brazil': 'br',
    'Bulgaria':'bg',
    'Canada': 'ca',
    'China':'cn',
    'Colombia': 'co',
    'Cuba': 'cu',
    'Czech Republic': 'cz',
    'Egypt': 'eg',
    'France': 'fr',
    'Germany':'de',
    'Greece': 'gr',
    'Hong Kong': 'hk',
    'Hungary': 'hu',
    'India': 'in',
    'Italy':'it',
    'Japan':'jp',
    'Latvia':'lv',
    'Malaysia':'my',
    'Mexico':'mx',
    'New Zealand':'nz',
    'Norway':'no',
    'Russia':'ru',
    'Singapore':'sg',
    'South Africa':'za',
    'South Korea':'kr',
    'Thailand':'th',
    'UAE':'ae',
    'United Kingdom':'gb',
    'United States':'us',
}


background_image=tk.PhotoImage(file='news.png')
background_image=background_image.zoom(2,2)
background_label=tk.Label(root, image=background_image)
background_label.place(x=0, y=0,relwidth=1,relheight=1)

label=tk.Label(root,text="UPDATES OF THE DAY ARE",font=('Courier',35))
label.place(relx=0.1,rely=0.01,relwidth=0.75,relheight=0.1)

frame=tk.Frame(root, bg='black',bd=2, relief=tk.SUNKEN)
frame.place(relx=0.5,rely=0.1,relwidth=0.75,relheight=0.1,anchor='n')

combo = ttk1.Combobox(frame, width=50, height=50, font=('courier',25))
combo['value']=("Select any Country",)
for i in country_dict:
    combo['values'] = (*combo['values'], i)
combo.current(0)
combo.place(relx=0.005,rely=0.25,relwidth=0.65, relheight=0.5)


def clicked():
    country = combo.get()
    if country == '':  
        pass
    else:
        countrynews = country_dict[country]        
        news = requests.get(                       
            "https://newsapi.org/v2/top-headlines?country={}&apiKey=ba37e41f235649f1b88035b56bf9efe5".format(
                countrynews))

        news_json = news.json()                    
		
        
        lower_frame = tk.Frame(root, bg='black', bd=3)
        lower_frame.place(relx=0.5, rely=0.25, relwidth=0.75, relheight=0.6, anchor='n')
       
        txt = scrolledtext.ScrolledText(lower_frame, width=40, height=10, wrap='word')
        txt.place(relwidth=1, relheight=1)

        j = 0
        for i in news_json['articles']:
            j = j + 1
            txt.insert(tk.INSERT, 'Headline {}'.format(j) + '\n','headline')
            txt.insert(tk.INSERT, i['description'] + '\n\n','description')
            txt.tag_config('headline',font=('Courier',16,'bold'))
            txt.tag_config('description',font=('Courier',14))
            

button = tk.Button(frame, text='GO', font=('Courier',25), command=clicked)
button.place(relx=0.7, rely=0.25, relwidth=0.3, relheight=0.5,)
root.mainloop()

