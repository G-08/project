CREATE TABLE Exercise (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    muscular_group TEXT NOT NULL
    exercise_description TEXT NOT NULL,  
);

CREATE TABLE Exercise_Training (
    training_id INT NOT NULL,
    exercise_id INT NOT NULL,
    reps INT NOT NULL,
    exercise_sets INT NOT NULL,
    exercise_description TEXT NOT NULL,
    PRIMARY KEY (training_id, exercise_id),
    FOREIGN KEY (training_id) REFERENCES Training(id),
    FOREIGN KEY (exercise_id) REFERENCES Exercise(id)
);

CREATE TABLE Training (
    id INT PRIMARY KEY,
    muscular_group TEXT NOT NULL,
    schedule_id INT NOT NULL,
    FOREIGN KEY (schedule_id) REFERENCES Schedule(id)
);

CREATE TABLE Schedule (
    id INT PRIMARY KEY
),

/*In caso non funzioni è colpa del Pietro*/

CREATE TABLE User (

    /*Identificativi*/
    email VARCHAR(30) NOT NULL PRIMARY KEY,
    first_name TEXT NOT NULL,
    second_name TEXT NOT NULL,
    pwd VARCHAR(30) NOT NULL, /*Dobbiamo capire come offuscarla per la sicurezza*/
    username VARCHAR(30) NOT NULL,
    dob DATE NOT NULL,

    /*Dati sul fisico*/

    user_weight INT NOT NULL,
    user_height INT NOT NULL,
    thighs INT NOT NULL,
    shoulders INT NOT NULL,
    waist INT NOT NULL,
    biceps INT NOT NULL,
    user_goal INT NOT NULL,

    /*Schedule*/
    user_schedule_id INT NOT NULL,
    FOREIGN KEY (user_schedule_id) REFERENCES Schedule(id)
),

INSERT INTO Exercise (id, exercise_name, muscular_group, exercise_description) VALUES
INSERT INTO Exercise (id, name, muscular_group, exercise_description) VALUES
    (1, 'Squat', 'Gambe', 'Esercizio per le gambe che coinvolge quadriceps, glutei e muscoli posteriori della coscia.'),
    (2, 'Stacchi da terra (Deadlift)', 'Schiena e Gambe', 'Esercizio per la schiena e le gambe che coinvolge principalmente i muscoli posteriori della coscia e i muscoli della schiena.'),
    (3, 'Panca piana (Bench Press)', 'Petto, Spalle e Tricipiti', 'Esercizio per il petto che coinvolge anche le spalle e i tricipiti.'),
    (4, 'Flessioni (Push-ups)', 'Petto, Spalle e Tricipiti', 'Esercizio per il petto, le spalle e i tricipiti che coinvolge anche il core.'),
    (5, 'Curl con bilanciere', 'Bicipiti', 'Esercizio per i bicipiti che coinvolge anche i muscoli dell''avambraccio.'),
    (6, 'Curl con manubri', 'Bicipiti', 'Esercizio per i bicipiti eseguito con manubri.'),
    (7, 'Curl martello', 'Bicipiti', 'Variante del curl per i bicipiti che coinvolge anche i muscoli dell''avambraccio.'),
    (8, 'Curl concentrato', 'Bicipiti', 'Esercizio per i bicipiti che isolano il muscolo brachiale.'),
    (9, 'Pullover con bilanciere', 'Petto e Dorsali', 'Esercizio che coinvolge petto e dorsali.'),
    (10, 'Pullover con manubrio', 'Petto e Dorsali', 'Variante del pullover eseguita con un manubrio.'),
    (11, 'Dip alle parallele', 'Petto e Tricipiti', 'Esercizio per il petto e i tricipiti eseguito con le parallele.'),
    (12, 'Trazioni alla sbarra (Pull-ups)', 'Dorsali e Bicipiti', 'Esercizio per i dorsali e i bicipiti eseguito tramite trazioni alla sbarra.'),
    (13, 'Lat machine', 'Dorsali e Bicipiti', 'Esercizio per i dorsali e i bicipiti eseguito con la lat machine.'),
    (14, 'Pressa orizzontale', 'Petto, Spalle e Tricipiti', 'Esercizio per il petto, le spalle e i tricipiti eseguito con la pressa orizzontale.'),
    (15, 'Pressa verticale', 'Spalle e Tricipiti', 'Esercizio per le spalle e i tricipiti eseguito con la pressa verticale.'),
    (16, 'Alzate laterali con manubri', 'Spalle', 'Esercizio per le spalle eseguito con alzate laterali con manubri.'),
    (17, 'Alzate frontali con manubri', 'Spalle', 'Esercizio per le spalle eseguito con alzate frontali con manubri.'),
    (18, 'Butterfly su macchina', 'Petto', 'Esercizio per il petto eseguito con la butterfly su macchina.'),
    (19, 'Shoulder press con manubri', 'Spalle e Tricipiti', 'Esercizio per le spalle e i tricipiti eseguito con shoulder press con manubri.'),
    (20, 'Shoulder press con bilanciere', 'Spalle e Tricipiti', 'Esercizio per le spalle e i tricipiti eseguito con shoulder press con bilanciere.'),
    (21, 'Affondi (Lunges)', 'Gambe', 'Esercizio per le gambe che coinvolge principalmente i quadricipiti e i glutei.'),
    (22, 'Affondi laterali', 'Gambe', 'Variante degli affondi che coinvolge principalmente i muscoli laterali delle gambe.'),
    (23, 'Squat jump', 'Gambe', 'Variante dello squat eseguita con un salto.'),
    (24, 'Jumping lunges', 'Gambe', 'Variante degli affondi eseguita con un salto tra una ripetizione e l''altra.'),
    (25, 'Jump squats', 'Gambe', 'Variante dello squat eseguita con un salto.'),
    (26, 'Leg press', 'Gambe', 'Esercizio per le gambe eseguito con la leg press.'),
    (27, 'Leg extension', 'Quadricipiti', 'Esercizio per i quadricipiti eseguito con la leg extension.'),
    (28, 'Leg curl', 'Ischiocrurali', 'Esercizio per gli ischiocrurali eseguito con la leg curl.'),
    (29, 'Calf raise', 'Polpacci', 'Esercizio per i polpacci eseguito con il calf raise.'),
    (30, 'Ab crunches', 'Addominali', 'Esercizio per gli addominali eseguito con le crunches.'),
    (31, 'Russian twist', 'Addominali e Obliqui', 'Esercizio per gli addominali e gli obliqui eseguito con il russian twist.'),
    (32, 'Plank', 'Core', 'Esercizio per il core eseguito con il plank.'),
    (33, 'Side plank', 'Core', 'Esercizio per il core eseguito con il side plank.'),
    (34, 'Sit-ups', 'Addominali', 'Esercizio per gli addominali eseguito con gli sit-ups.'),
    (35, 'Mountain climbers', 'Addominali e Cardio', 'Esercizio cardiovascolare che coinvolge gli addominali.'),
    (36, 'Burpees', 'Addominali, Cardio e Gambe', 'Esercizio cardiovascolare che coinvolge tutto il corpo.'),
    (37, 'Superman', 'Dorsali', 'Esercizio per i dorsali eseguito con il superman.'),
    (38, 'Dead bug', 'Addominali e Core', 'Esercizio per gli addominali e il core eseguito con il dead bug.'),
    (39, 'Hip thrust', 'Glutei', 'Esercizio per i glutei eseguito con il hip thrust.'),
    (40, 'Glute bridge', 'Glutei', 'Esercizio per i glutei eseguito con il glute bridge.'),
    (41, 'Ab rollouts', 'Addominali', 'Esercizio per gli addominali eseguito con gli ab rollouts.'),
    (42, 'Cable crunch', 'Addominali', 'Esercizio per gli addominali eseguito con il cable crunch.'),
    (43, 'Hanging leg raise', 'Addominali', 'Esercizio per gli addominali eseguito con gli hanging leg raise.'),
    (44, 'Leg raises on bench', 'Addominali', 'Esercizio per gli addominali eseguito con le leg raises su panca.'),
    (45, 'Bicycle crunches', 'Addominali', 'Esercizio per gli addominali eseguito con le bicycle crunches.'),
    (46, 'Reverse crunches', 'Addominali', 'Esercizio per gli addominali eseguito con le reverse crunches.'),
    (47, 'Oblique crunches', 'Obliqui', 'Esercizio per gli obliqui eseguito con le oblique crunches.'),
    (48, 'Romanian deadlift (Stacchi rumeni)', 'Schiena e Gambe', 'Esercizio per la schiena e le gambe che coinvolge principalmente i muscoli posteriori della coscia e i muscoli della schiena.'),
    (49, 'Good morning', 'Schiena e Gambe', 'Esercizio per la schiena e le gambe che coinvolge principalmente i muscoli posteriori della coscia e i muscoli della schiena.'),
    (50, 'Box jumps', 'Gambe', 'Esercizio per le gambe eseguito con i box jumps.'),
    (51, 'Step-ups', 'Gambe', 'Esercizio per le gambe eseguito con gli step-ups.'),
    (52, 'Hip abduction', 'Glutei', 'Esercizio per i glutei eseguito con l''hip abduction.'),
    (53, 'Hip adduction', 'Glutei', 'Esercizio per i glutei eseguito con l''hip adduction.'),
    (54, 'Reverse flyes', 'Spalle e Dorsali', 'Esercizio per le spalle e i dorsali eseguito con le reverse flyes.'),
    (55, 'Bent-over rows', 'Dorsali e Bicipiti', 'Esercizio per i dorsali e i bicipiti eseguito con le bent-over rows.'),
    (56, 'T-bar row', 'Dorsali e Bicipiti', 'Esercizio per i dorsali e i bicipiti eseguito con la T-bar row.'),
    (57, 'Face pulls', 'Spalle e Dorsali', 'Esercizio per le spalle e i dorsali eseguito con le face pulls.'),
    (58, 'Shrugs', 'Trapezi', 'Esercizio per i trapezi eseguito con gli shrugs.'),
    (59, 'Triceps dip su panca', 'Tricipiti', 'Esercizio per i tricipiti eseguito con le triceps dip su panca.'),
    (60, 'Skull crushers', 'Tricipiti', 'Esercizio per i tricipiti eseguito con gli skull crushers.'),
    (61, 'Triceps pushdown', 'Tricipiti', 'Esercizio per i tricipiti eseguito con le triceps pushdown.'),
    (62, 'French press', 'Tricipiti', 'Esercizio per i tricipiti eseguito con il french press.'),
    (63, 'Kickbacks', 'Tricipiti', 'Esercizio per i tricipiti eseguito con i kickbacks.'),
    (64, 'Hammer curls', 'Bicipiti', 'Esercizio per i bicipiti eseguito con gli hammer curls.'),
    (65, 'Incline bench press', 'Petto e Spalle', 'Esercizio per il petto e le spalle eseguito con la incline bench press.'),
    (66, 'Decline bench press', 'Petto e Spalle', 'Esercizio per il petto e le spalle eseguito con la decline bench press.'),
    (67, 'Pec deck flyes', 'Petto', 'Esercizio per il petto eseguito con le pec deck flyes.'),
    (68, 'Bent-over lateral raises', 'Spalle', 'Esercizio per le spalle eseguito con le bent-over lateral raises.'),
    (69, 'Lateral raises su panca inclinata', 'Spalle', 'Esercizio per le spalle eseguito con le lateral raises su panca inclinata.'),
    (70, 'Reverse curls', 'Bicipiti', 'Esercizio per i bicipiti eseguito con le reverse curls.'),
    (71, 'Leg raises', 'Addominali', 'Esercizio per gli addominali eseguito con le leg raises.'),
    (72, 'Leg pull-ins', 'Addominali', 'Esercizio per gli addominali eseguito con le leg pull-ins.'),
    (73, 'Reverse hyperextension', 'Schiena e Glutei', 'Esercizio per la schiena e i glutei eseguito con le reverse hyperextension.'),
    (74, 'Prone hamstring curl', 'Ischiocrurali', 'Esercizio per gli ischiocrurali eseguito con il prone hamstring curl.'),
    (75, 'Decline crunch', 'Addominali', 'Esercizio per gli addominali eseguito con le decline crunch.'),
    (76, 'Pike push-ups', 'Petto, Spalle e Tricipiti', 'Variante delle push-ups che coinvolge petto, spalle e tricipiti.'),
    (77, 'Spiderman push-ups', 'Petto, Spalle e Addominali', 'Variante delle push-ups che coinvolge petto, spalle e addominali.'),
    (78, 'Wall sit', 'Gambe', 'Esercizio per le gambe eseguito con il wall sit.'),
    (79, 'Dumbbell snatch', 'Spalle, Gambe e Core', 'Esercizio per le spalle, le gambe e il core eseguito con il dumbbell snatch.'),
    (80, 'Russian kettlebell swing', 'Glutei, Schiena e Gambe', 'Esercizio per i glutei, la schiena e le gambe eseguito con il russian kettlebell swing.');
;
