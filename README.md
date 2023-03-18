# Home assignment - elevators

## How to run

Clone the repository:
<pre><code>git clone https://github.com/Nitsan448/Arbox-Class-Preview-Assignment.git
</code></pre>

Install node modules:
<pre><code>cd ./Arbox-Elevators-Assignment
npm install
</code></pre>

Start the web app:
<pre><code>npm start
</code></pre>

## Project description

Simillar to the elevators task, the project manages the state of each client using an array called 'clients'.</br>
Each element in this array contains information such as the client's id, name, image, if he is checked in, if he participates in the class, and whether or not he has a debt.

When the user searches for a client, it finds the first 3 clients that match the searched text and do not participate in the class, and displays them in the drop down.
