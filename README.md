<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="UTF-8">
</head>
<body>
    <article>
        <header>
            <h1>
                UnX (Unemployment Explorer)
            </h1>
        </header>
            <h1>
                Prezentare proiect:</br>
                <a href="https://www.youtube.com/watch?v=bfFlV2lPSgQ" alt="Video prezentare proiect">Unemployment Explorer - Prezentare Video</a>
            </h1>
            <h1>
                Page Speed Insights (<i>Lighthouse</i> în Google Chrome):
            </h1>
            <h3>
                În folderul <i>docs/page_speed_insights</i>.<br>
                Pozele '*Performance.png' reprezintă statistici cu testul default de la Lighthouse.<br>
                Poza 'VisualizerInteraction.png' reprezintă performanța paginii <i>Vizualizator</i> în cazul de utilizare: 3 luni, pe medii de rezidență, <b>toate</b> județele, ca hartă interactivă + export .svg.
            </h3>
            <h3>
                Diagrame C4: în folder-ul <i>docs/c4_diagrams</i>.
            </h3>
        <h2>Cuprins</h2>
        <ul>
            <li>
                <a href="#authors">Autori</a>
            </li>
            <li>
                <a href="#introduction">1. Introducere</a>
                <ul>
                    <li><a href="#introduction-purpose">1.1 Scop</a></li>
                    <li><a href="#conventions">1.2 Convenție de scriere</a></li>
                    <li><a href="#audience">1.3 Publicul țintă</a></li>
                    <li><a href="#product-scope">1.4 Scopul produsului</a></li>
                    <li><a href="#references">1.5 Referințe</a></li>
                </ul>
            </li>
            <li><a href="#overall">2. Descriere Generală</a>
                <ul>
                    <li><a href="#product-perspective">2.1 Perspectiva produsului</a></li>
                    <li><a href="#product-functions">2.2 Funcțiile produsului</a></li>
                    <li><a href="#users">2.3 Clase și caracteristici ale utilizatorilor</a></li>
                    <li><a href="#operating-environment">2.4 Mediul de operare</a></li>
                    <li><a href="#documentation">2.5 Documentația pentru utilizator</a></li>
                </ul>
            </li>
            <li><a href="#external">3. Interfețele aplicației </a>
                <ul>
                    <li><a href="#user-interface">3.1 Interfața utilizatorului </a>
                        <ul>
                            <li><a href="#nav-bar">3.1.1 Bara de navigație </a></li>
                            <li><a href="#home-page">3.1.2 Pagina de acasă </a></li>
                            <li><a href="#visualizer">3.1.3 Pagina de vizualizare </a></li>
                            <li><a href="#report-page">3.1.4 Pagina de Asistență</a></li>
                        </ul>
                    </li>
                    <li><a href="#hardware-interface">3.2 Interfața Hardware </a></li>
                    <li><a href="#software-interface">3.3 Interfața Software</a></li>
                    <li><a href="#communication-interface">3.4 Interfața de comunicare</a></li>
                </ul>
            </li>
            <li><a href="#system-features">4. Caracteristici ale sistemului</a>
                <ul>
                    <li><a href="#accessing-features">4.1 Accesarea informațiilor oferite de site</a>
                        <ul>
                            <li><a href="#accessing-features-1">4.1.1 Descriere și generalități </a></li>
                            <li><a href="#accessing-features-2">4.1.2 Actualizarea informațiilor</a></li>
                            <li><a href="#accessing-features-3">4.1.3 Condiții de funcționare</a></li>
                        </ul>
                    </li>
                    <li><a href="#options-selection">4.2 Secțiunea <i>„Selectare Opțiuni”</i></a>
                        <ul>
                            <li><a href="#options-selection-1">4.2.1 Descriere și generalități</a></li>
                            <li><a href="#options-selection-2">4.2.2 Condiții de funcționare</a></li>
                        </ul>
                    </li>
                    <li><a href="#export">4.3 Secțiunea <i>„Export”</i></a>
                        <ul>
                            <li><a href="#export-1">4.3.1 Descriere și generalități</a></li>
                            <li><a href="#export-2">4.3.2 Condiții de funcționare</a></li>
                        </ul>
                    </li>
                    <li><a href="#report">4.4 Secțiunea de <i>„Asistență”</i></a>
                        <ul>
                            <li><a href="#report-1">4.4.1 Descriere și generalități</a></li>
                            <li><a href="#report-2">4.4.2 Mod de utilizare</a></li>
                            <li><a href="#report-3">4.4.3 Condiții de funcționare</a></li>
                        </ul>
                    </li>
                </ul>
            </li>
            <li><a href="#non-functional">5. Funcționalități pentru protecție, corectitudine, și experiență-utilizator</a>
                <ul>
                    <li><a href="#safety">5.1 Protecția datelor</a></li>
                    <li><a href="#correctness">5.2 Corectitudinea și integritatea datelor</a></li>
                    <li><a href="#software-attributes">5.3 Calitățile Software </a></li>
                </ul>
            </li>
        </ul>
        <div role="contentinfo">
            <section id="authors" typeof="sa:AuthorsList">
                <h2>Autori</h2>
                <ul>
                    <li property="schema:author" typeof="sa:ContributorRole">
                        <span typeof="schema:Person">
                            <meta content="Alexandru" property="schema:givenName">
                            <meta content="Butnaru" property="schema:familyName">
                            <span property="schema:name">Butnaru Alexandru</span>
                        </span>
                        <ul>
                            <li property="schema:roleContactPoint" typeof="schema:ContactPoint">
                                <a href="mailto:alexandrubutnaru32@gmail.com@gmail.com" property="schema:email">alexandrubutnaru32@gmail.com</a>
                            </li>
                        </ul>
                    </li>
                    <li property="schema:author" typeof="sa:ContributorRole">
                        <span typeof="schema:Person">
                            <meta content="Cătălin" property="schema:givenName">
                            <meta content="Dimitrie" property="schema:additionalName">
                            <meta content="Morărașu" property="schema:familyName">
                            <span property="schema:name">Morărașu Cătălin-Dimitrie</span>
                        </span>
                        <ul>
                            <li property="schema:roleContactPoint" typeof="schema:ContactPoint">
                                <a href="mailto:cdmorarasu@gmail.com" property="schema:email">cdmorarasu@gmail.com</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </section>
        </div>
        <section id="introduction">
            <h3>1. Introducere</h3>
            <section id="introduction-purpose">
                <h4>1.1 Scop</h4>
                <p>
                    UnX (Unemployment Explorer) este o aplicație web dezvoltată de studenții menționați în secțiunea
                    de Autori de la Facultatea de
                    Informatică a Universității Alexandru Ioan Cuza.
                    Scopul acestui document este acela de a prezenta o descriere detaliată a funcționalităților, precum și
                    de
                    specifica cerințele aplicației web. Această aplicație
                    va oferi utilizatorilor posibilitatea de a vizualiza și compara pe diferite criterii datele publice 
                    referitoare la șomajul din România pe minim ultimele 12 luni. Statisticile pot fi vizualizate sub forma de grafice,
                    diagrame circulare, grafice de bare, precum și printr-o reprezentare cartografică pe harta României.
                </p>
            </section>
            <section id="conventions">
                <h4> 1.2 Convenția documentului</h4>
                <ul>
                    <li>
                        Acest document urmează șablonul de documentație a cerințelor software conform IEEE Software
                        Requirements
                        Specification.
                    </li>
                    <li>
                        Textul <b>îngroșat</b> este folosit pentru a defini noțiuni personalizate sau pentru a accentua
                        concepte
                        importante.
                    </li>
                </ul>
            </section>
            <section id="audience">
                <h4>1.3 Publicul țintă</h4>
                <p>
                    Acest document este destinat profesorilor, studenților sau dezvoltatorilor, însă orice utilizator,
                    indiferent
                    de cunoștințele lor tehnologice,
                    poate consulta secțiunile de <b>Interfeța utilizatorului</b> și <b>Caracteristici ale sistemului</b>
                    pentru a
                    obține o mai bună înțelegere a ceea ce oferă aplicația.
                </p>
            </section>
            <section id="product-scope">
                <h4>1.4 Scopul Produsului</h4>
                <p>
                    Scopul aplicației este acela de a oferi utilizatorilor acces la date actualizate si relevante despre șomajul
                    din România. Prin intermediul acestei aplicații, utilizatorii pot explora și înțelege evoluția 
                    pieței muncii în diferite regiuni, sectoare și grupuri demografice. UnX oferă instrumente interactive și 
                    vizualizări grafice, utilizatorul având posibilitatea de filtra datele pe propriul plac, pentru 
                    a analiza și interpreta datele legate de șomaj, permițând utilizatorilor 
                    să identifice tendințe, să înțeleagă factorii care influențează fluctuațiile ratei de șomaj.
                </p>
            </section>
            <section id="references">
                <h4>1.5 Bibliografie</h4>
                <ul>
                    <li>H Rick. IEEE-Template - GitHub</li>
                </ul>
            </section>
        </section>
        <section id="overall">
        <h3>2. Descriere Generală</h3>
        <section id="product-perspective">
            <h4>2.1 Perspectiva produsului</h4>
            <p>UnX (Unemployment explorer) este o aplicație dezvoltată în cadrul cursului de Tehnologii Web,
                menită să
                ofere posibilitatea de a vizualiza date și statistici despre rata șomajului din România din minim ultimele 12 luni.
        </section>
        <section id="product-functions">
            <h4>2.2 Funcționalitățile produsului</h4>
            Fiecare utilizator va avea acces la urmatoarele funcționălități:
            <ul>
                <li>să consulte pagină "Acasă" pentru a vedea o scurtă descriere a site-ului</li>
                <li>să acceseze pagina "Vizualizator" pentru a vedea datele despre rata șomajului</li>
                <li>în cadrul paginii "Vizualizator", să selecteze perioada din care să fie afișate datele</li>
                <li>în cadrul paginii "Vizualizator", să selecteze criteriul după care să fie afișate datele</li>
                <li>în cadrul paginii "Vizualizator", să selecteze Județele din care să fie afișate datele</li>
                <li>în cadrul paginii "Vizualizator", să selecteze tipul de vizualizare a datelelor</li>
                <li>în cadrul paginii "Vizualizator", să selecteze tipul de export și să exporteze rezultatul primit</li>
                <li>să acceseze pagina "Asistență" pentru a realiza un raport în legătura cu problemele tehnice sau
                    a datelor și corectitudinea acestora
                </li>
                <li>să acceseze pagina "Administrativ" unde se poate conecta cu un cont de administrator. În urma conectării poate modifica perioada din care
                    din care sunt preluate datele și poate consulta rapoartele primite de la ceilalți utilizatori.
                </li>
            </ul>
        </section>
        <section id="users">
            <h4>2.3 Clase și caracteristici ale utilizatorilor</h4>
            <h5>2.3.1 Utilizator principal</h5>
            <p>Utilizatorii pot fi: </p>
            <ul>
                <li>Oameni care doresc sa vizualizeze datele legate de șomaj pentru interesul propriu</li>
                <li>Studenți care doresc să folosească datele pentru proiecte sau lucrări de licență</li>
                <li>Profesori care doresc să folosească datele pentru cursuri sau seminarii</li>
                <li>Publicații care doresc sa realizeze un reportaj pe baza rezultatelor</li>
            </ul>
            <h5>2.3.2 Caracteristici</h5>
            <p>Utilizatorii <b>nu au acces la toate</b> paginile și funcționalitățile site-ului. Pot <b>vizualiza</b> 
                datele în diferite
                moduri(grafice, diagrame circulare, grafice de bare și cartografic pe o hartă a României) și 
                pot <b>exporta</b> rezultatele în format CSV, PDF sau SVG. totodată utilizatorii pot raporta eventualele
                probleme tehnice sau cele ce au legătură cu corectitudinea datelor pe pagina ”Asistență”.
                În schimb aceștia <b>nu au</b> acces garantat la pagina de administrare a datelor si a rapoartelor, unde
                accesul se face pe baza unui cont de administrator.
            </p>
        </section>
        <section id="operating-environment">
            <h4>2.4 Mediul de operare</h4>
            <p>
                Produsul dezvoltat poate fi utilizat pe orice dispozitiv cu un browser web care suportă HTML5, CSS și
                JavaScript.
            </p>
        </section>
        <section id="documentation">
            <h4>2.5 Documentația pentru utilizator</h4>
            <p>
                Utilizatorii pot consulta acest document pentru explicații detaliate despre funcționalitățile aplicației
                web.
            </p>
        </section>
    </section>
    <section id="external">
        <h3>3. Interfețele aplicației</h3>
        <section id="user-interface">
            <h4>3.1 Interfața utilizatorului</h4>
            Mai jos, puteți vedea o prezentare generală a fiecărei pagini a aplicației și funcționalităților pe care le
            oferă:
            <ul>
            <li id="nav-bar"><b>Bara de navigație</b></li>
            <li style="list-style: none">
                <ul>
                <li>Aceasta reprezintă meniul de navigare către fiecare pagina a aplicației. Acesta este prezent 
                    pe fiecare pagina și are o poziție fixă indiferent de scroll.
                </li>
                <li class="pictures" style="list-style: none"><img alt="login" src="docs/navBarNew.png" width=800
                ></li>
                </ul>
            </li>
            <li id="home-page"><b> Pagina de acasă</b></li>
            <li style="list-style: none">
                <ul>
                <li>Pagina are rolul de prezenta o scurtă descriere a site-ului și modalitățile de vizualizare a datelor</li>
                <li class="pictures" style="list-style: none"><img alt="overview" src="docs/homePageNew.png"
                                           width=800>
                </li>
                <li class="pictures" style="list-style: none"><img alt="overview" src="docs/homePage2.png"
                    width=800>
                </li>
                </ul>
            </li>
            <li id="visualizer"><b>Pagina de vizualizare</b></li>
            <li style="list-style: none">
                <ul>
                <li>Pagina oferă posibilitatea utilizatorului datele despre rata șomajului din România pe 
                    ultimele 12 luni. Mai intâi acesta alege <b>perioada</b> pe care vor fi prelucrate datele
                </li>
                <li class="pictures" style="list-style: none"><img alt="period" src="docs/vizPage1new.png"
                                           width=800>
                </li>
                <li>Apoi utilizatorul alege <b>criterul</b> după care vor fi afișate datele
                </li>
                <li class="pictures" style="list-style: none"><img alt="criteriu" src="docs/vizPage2new.png"
                                           width=800>
                </li>
                <li>Urmeaza slectarea <b>județelor</b> din care vor fi preluate datele.</li>
                <li class="pictures" style="list-style: none"><img alt="judete"
                                           src="docs/vizPage3new.png" width=800>
                </li>
                <li>Utilizatorul poate alege <b>tipul de vizualizare</b> a datelor</li>
                <li class="pictures" style="list-style: none"><img alt="type" src="docs/vizPage4new.png"
                                           width=800>
                </li>
                <li>În urma aplicării filtrelor, utilizatorul va primi rezultatul sub forma de grafic, diagramă
                    circulară, grafic de bare sau reprezentare cartografică pe harta României, în căsuța destinată
                    afișării rezultatelor.
                </li>
                <li class="pictures" style="list-style: none"><img alt="result" src="docs/vizPage5new.png"
                    width=800>  
                </li>
                <li class="pictures" style="list-style: none"><img alt="result" src="docs/vizPage5new2.png"
                    width=800>  
                </li>
                <li>La final utilizatorul poate <b>exporta</b> rezultatul primit</li>
                <li class="pictures" style="list-style: none"><img alt="export" src="docs/vizPage6.png"
                                           width=800>
                </li>
                </ul>
            </li>
            <li id="report-page"><b>Pagina de Asistență</b></li>
            <li style="list-style: none">
                <ul>
                <li>Pagina conține un formular pe care utilizatorii îl pot completa pentru a raporta o problemă
                    tehnică sau o problemă legată de corectitudinea datelor.
                </li>
                <li class="pictures" style="list-style: none"><img alt="report" src="docs/reportPage.png"
                                           width=800>
                </li>
                </ul>
            </li>
            <li id="report-page"><b>Pagina de Administratori</b></li>
            <li style="list-style: none">
                <ul>
                <li>La început pagina oferă posibilitatea de a te conecta cu un cont de administrator.
                </li>
                <li class="pictures" style="list-style: none"><img alt="report" src="docs/adminPage1.png"
                                           width=800>
                </li>
                <li>În urma conectării, administratorii au posibilitatea de a schimba perioada din care pot fi preluate datele 
                sau de a verifica rapoartele trimise de ceilalți utilizatori.
                </li>
                <li class="pictures" style="list-style: none"><img alt="report" src="docs/adminPage2.png"
                                           width=800>
                </li>
                <li class="pictures" style="list-style: none"><img alt="report" src="docs/adminPage3.png"
                                           width=800>
                </li>
                </ul>
            </li>
            </ul>
            <section id="hardware-interface">
                <h4>3.2 Interfața Hardware</h4>
                <p>
                    Acest produs nu necesită interfețe hardware, funcționând pe orice platformă (calculatoare,
                    laptopuri,
                    telefoane etc.), care are instalată un browser.
                </p>
            </section>
            <section id="software-interface">
                <h4>3.3 Interfața Software</h4>
                <p>
                    Cerințele minime de software includ un browser funcțional, compatibil cu HTML5 și cu JavaScript.
                </p>
            </section>
            <section id="communication-interface">
                <h4>3.4 Interfața de comunicare</h4>
                <p>
                    Aplicația necesită o conexiune la internet. Standardul de comunicare care va fi utilizat este HTTP.
                </p>
            </section>
        </section>
    </section>
            <section id="system-features">
                <h3>4. Caracteristici ale sistemului</h3>
                <section id="accessing-features">
                    <h4>4.1 Accesarea informațiilor oferite de site</h4>
                    <h5 id="accessing-features-1">4.1.1 Descriere și generalități</h5>
                        Fiind o aplicație web cu singurul scop de a oferi informații la cerere, experiența de utilizare este una simplistă: <b>utilizatorii</b> nu au nevoie de cont pentru a putea interoga aplicația pentru statisticile dorite. <b>Utilizatorii</b> se pot conecta doar cu un cont de administrator.
                    <h5 id="accessing-features-2">4.1.2 Actualizarea informațiilor</h5>
                        <b>Utilizatorii</b> nu au posibilitatea de a actualiza datele & statisticile primite din motive de integritate și factualitate a informațiilor. <b>Administratorii</b> conectați au doar posibilitatea de a modifica perioada din care sunt preluate datele și de a verifica rapoartele trimise de utilizatori.
                    <h5 id="accessing-features-3">4.1.3 Condiții de funcționare</h5>
                        Oricine cu acces la un browser web (fie Desktop, fie Mobile) și o conexiune la internet poate accesa funcționalitățile oferite de site.
                </section>
                <section id="options-selection">
                    <h4>4.2 Secțiunea <i>„Selectare Opțiuni”</i></h4>
                    <h5 id="options-selection-1">4.2.1 Descriere și generalități</h5>
                    Oferă <b>utilizatorilor</b> posibilitatea de a seta parametrii doriți în cadrul statisticii solicitate:
                    <ul>
                        <li>
                            Perioada de timp pentru care se doresc informațiile: ultimele <b>12 luni</b>, fiecare utilizator având posibilitatea să-și aleaga exact câte luni dorește;
                        </li>
                        <li>
                            Criteriul de grupare: <b>mediul de rezidență, nivelul de educație, grupe de vârstă,</b> sau <b>genul</b> șomerilor;
                        </li>
                        <li>
                            Județele pentru care se doresc informațiile: fie <b>toate județele României</b>, fie <b>o selecție dintre acestea</b>;
                        </li>
                        <li>
                            Tipul de vizualizare (formatul rezultatului): <b>hartă interactivă, diagramă circulară, grafic de bare,</b> sau <b>grafic de linii</b>.
                        </li> 
                    </ul>
                    <h5 id="options-selection-2">4.2.2 Condiții de funcționare</h5>
                        Pentru generarea rezultatelor, fiecare criteriu trebuie completat (nu se consideră valori prestabilite).
                </section>
                <section id="export">
                    <h4>4.3 Secțiunea <i>„Export”</i></h4>
                    <h5 id="export-1">4.3.1 Descriere și generalități</h5>
                        Secțiunea finală a paginii <i>„Vizualizator”</i> este destinată exportului (descărcării) rezultatelor primite în diverse formate: <b>CSV, PDF, SVG</b>.
                    <h5 id="export-2">4.3.2 Condiții de funcționare</h5>
                        Această funcționalitate va exporta doar rezultatul curent afișat în pagina web. De aceea, este necesară realizarea unei noi interogări pentru a obține un rezultat. <b>Harta</b> nu poate fi exportată, doar <b>graficul de bare, graficul de linii</b> și <b>diagrama circulară</b>.<br>
                        De asemenea, selectarea formatului este obligatorie.
                </section>
                <section id="report">
                    <h4>4.4 Secțiunea de <i>„Asistență”</i></h4>
                    <h5 id="report-1">4.4.1 Descriere și generalități</h5>
                        <b>Utilizatorii</b> au posibilitatea de a raporta probleme sau erori ale aplicației, fie ele de natură tehnică (funcționalități invalide) sau de conținut (informații incorecte).
                    <h5 id="report-2">4.4.2 Mod de utilizare</h5>
                        <b>Utilizatorii</b> vor completa:
                        <ul>
                            <li>
                                Email-ul, pentru a putea fi contactați ulterior referitor la problema raportată;
                            </li>
                            <li>
                                Tipul problemei: <b>Eroare tehnică</b> sau <b>Date/Rezultate eronate</b>;
                            </li>
                            <li>
                                Descrierea problemei: o explicație detaliată a problemei întâmpinate.
                            </li>
                        </ul>
                    <h5 id="report-3">4.4.3 Condiții de funcționare</h5>
                        Toate câmpurile formularului de raportare trebuie completate pentru a putea fi trimis.
                </section>
                <section id="admin">
                    <h4>4.5 Secțiunea de <i>„Administrativ”</i></h4>
                    <h5 id="report-1">4.5.1 Descriere și generalități</h5>
                        <b>Utilizatorii</b> au posibilitatea de a se conecta cu un cont de administrator. Cât timp sunt conectați au posibilitatea de a selecta perioada din care datele sunt importate în baza de date sau de a vedea rapoartele trimise de ceilalți utilizatori.
                    <h5 id="report-2">4.5.2 Mod de utilizare</h5>
                        <b>Utilizatorii</b> vor completa:
                        <ul>
                            <li>
                                Numele contului de administrator;
                            </li>
                            <li>
                                Parola contului;
                            </li>
                        </ul>
                        <b>După conectare</b>:
                        <ul>
                            <li>
                                Modifica perioada preluării datelor, selectând noua ultimă lună, precum și noul număr de luni memorate;
                            </li>
                            <li>
                                Citirea rapoartelor și închiderea acestora;
                            </li>
                        </ul>
                    <h5 id="report-3">4.5.3 Condiții de funcționare</h5>
                        Conectarea cu un cont valid de administrator.
                </section>
            </section>
            <section id="non-functional">
                <h3>5. Funcționalități pentru protecție, corectitudine, și experiență-utilizator</h3>
                <section id="safety">
                    <h4>5.1 Protecția datelor</h4>
                    <p>
                        Funcționalitatea primară a site-ului (generarea statisticilor) nu necesită date personale ale <b>utilizatorilor</b>.
                        În cadrul formularului de raportare a problemelor, adresa de email completată nu este făcută publică, ci este accesată doar de către <b>administratorii</b> site-ului pentru a putea răspunde la solicitare.
                    </p>
                </section>
                <section id="correctness">
                    <h4>5.2 Corectitudinea și integritatea datelor</h4>
                    <p>
                        <b>Utilizatorii</b> nu au acces la baza de date a site-ului, astfel încât nu pot modifica sau șterge datele existente.
                        <b>Administratorii</b> sunt singurii care pot interveni asupra datelor, dar doar în scopul de a corecta erorile sau de a îmbunătăți experiența utilizatorilor.
                        Datele sunt luate de pe site-ul oficial al <a href="www.data.gov.ro">Institutului Național de Statistică, în colaborare cu ANOFM</a>, astfel încât acestea sunt corecte și actualizate.
                    </p>
                </section>
                <section id="software-attributes">
                    <h4>5.3 Calitățile Software</h4>
                    <ul>
                        <li>Adaptabilitate</li>
                        <li>Ușurință în utilizare</li>
                        <li>Flexibilitate</li>
                    </ul>
                </section>
            </section>
        </article>
    </body>
</html>
