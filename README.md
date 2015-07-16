# sortd
a web app for sorting out your problems

### TO DO

- [x] add "sorted problems" page, with topbar link
- [x] underline spaces in the d3 visualization when swapping them
- [x] when the letter being swapped is a space, generate "space" instead of " " in the text description

## Artist Statement

_Sort'd_ is an opportunistic, poetic, playful web intervention that capitalizes on the ambiguous nature of the abstruct, unhuman network, part of which is the internet. It plays the tropes of the techno-optimistic, neoliberal world as a farcical narrative device, toward a deliberate attempt at misunderstanding and miscommunication. The site is totally functional, and does exactly what it says it does. It promises to 'sort out your problems', and it does in fact take a representation of the problem, and sort it. In the gulf between semantic communication between the user and the machine, its perspective and vitality may be considered as both apart from, and a part of the human.

Sorting, as a task, is one of the most important in computer science, as it forms the basis for other more complex tasks. Its role as an essential task and the familiarity with which the problem can be expressed have combined to contribute to sorting's prominence as a subject of study for both researchers and students. A sorting algorithm receives a set of unordered information as input and produces an ordered permutation of that information, according to some key. _Sort'd_ uses the classic "quicksort" algorithm, which is a recursive, partition based solution, first described by Tony Hoare in 1960. It selects a character from the whole set, and then partitions the set into smaller unordered sets, with all the values smaller than the selected character in one partiion, and the values greater in the other. This process is then repeated on the unordered partitions until the set is ordered.

The poetic aspect of _Sort'd_ pivots on the falliability of communication. Writing is constructed from meaning in the mind of the writer, and then performs as a set of protocols to construct new meaning in the mind of the reader. This process happens whether one or both or none of the parties involved is a machine. _Sort'd_ comprehends information given to it from its own, machinic perspective. It does in fact solve the problem, and performs this solution for the user, taking the ambiguities of human language and smoothing them into a string of ordered data, at once full and totally emptied of meaning.

## development roadmap

### backend

- [x] receive string, output steps, with all text, as json
- [x] save steps to retrieveable json file
  - [x] generate unique hash for each set of steps and text
- [x] send json according to received hash
- [x] send json after generating steps (callback for saving should call the send function using the hash)

### frontend

- [x] basic template (handlebars, css)
- [x] individual page layouts
  - [x] landing (100% width, big pictures)
  - [x] about (me pic, bio)
  - [x] sort (d3 canvas, text directions, next/back, stage directions)
- [x] d3 canvas
  - [x] bind and render text
  - [x] animate changes according to json
- [x] send text to server with jq + ajax
- [x] give json to d3 to bind, iterate through
- [x] loading modal
