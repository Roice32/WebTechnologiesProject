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
    <h2>Cuprins</h2>
    <ul>
        <li>
            <a href="#authors">Autori</a>
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
    <section id="authors">
        <h3>Autori</h3>
        <ul>
            <li> Butnaru Alexandru, 2B4</li>
            <li> Morărașu Cătălin-Dimitrie, 2B4</li>
        </ul>
            <section id="system-features">
                <h3>4. Caracteristici ale sistemului</h3>
                <section id="accessing-features">
                    <h4>4.1 Accesarea informațiilor oferite de site</h4>
                    <h5 id="accessing-features-1">4.1.1 Descriere și generalități</h5>
                        Fiind o aplicație web cu singurul scop de a oferi informații la cerere, experiența de utilizare este una simplistă: <b>utilizatorii</b> nu au nevoie de cont pentru a putea interoga aplicația pentru statisticile dorite. 
                    <h5 id="accessing-features-2">4.1.2 Actualizarea informațiilor</h5>
                        <b>Utilizatorii</b> nu au posibilitatea de a actualiza datele & statisticile primite din motive de integritate și factualitate a informațiilor.
                    <h5 id="accessing-features-3">4.1.3 Condiții de funcționare</h5>
                        Oricine cu acces la un browser web (fie Desktop, fie Mobile) și o conexiune la internet poate accesa funcționalitățile oferite de site.
                </section>
                <section id="options-selection">
                    <h4>4.2 Secțiunea <i>„Selectare Opțiuni”</i></h4>
                    <h5 id="options-selection-1">4.2.1 Descriere și generalități</h5>
                    Oferă <b>utilizatorilor</b> posibilitatea de a seta parametrii doriți în cadrul statisticii solicitate:
                    <ul>
                        <li>
                            Perioada de timp pentru care se doresc informațiile: ultimele <b>3 luni, 6 luni, 9 luni,</b> sau <b>12 luni</b>;
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
                        Această funcționalitate va exporta doar rezultatul curent afișat în pagina web. De aceea, este necesară realizarea unei noi interogări pentru a obține un rezultat.<br>
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
                        Datele sunt luate de pe site-ul oficial al <a href="data.gov.ro">Institutului Național de Statistică, în colaborare cu ANOFM</a>, astfel încât acestea sunt corecte și actualizate.
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
        </section>
    </section>
</article>
</body>
</html>