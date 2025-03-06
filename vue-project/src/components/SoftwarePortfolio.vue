<template>
    <div id="software">
        <div id="github">
            <div id="profile-card" class="github-card" data-github="codecy2160" data-width="400" data-height="" data-theme="medium"></div>
            <div id="repo-cards">
                <div class="github-card" data-github="Codecy2160/manga-bubble-shaper" data-width="400" data-height="" data-theme="default"></div>
            </div>
        </div>
        <div id="shaper-playfield">
            <div id="shaper-input">
                <input type="text" id="input-field" class="expand-input" placeholder="Enter text here">
                <button @click="shapeText()" id="shaper-button">Shape Text</button>
            </div>
            <div id="shaper-output">
                <h2>Shaped Text</h2>
                <p>{{ shapedText }}</p>
            </div>
        </div>
    </div>
    <FooterComponent/>
</template>

<script>
import FooterComponent from './Footer.vue';

export default {
    name: 'SoftwarePortfolio',
    components: {
        FooterComponent,
    },
    data() {
        return {
            shapedText: '',
            inputText: ''
        };
    },
    methods: {
        charCount(str) {
            if(str === undefined) return;
            var raw = str.replace(/[^\w\s\u2026]/gmi, "").replace(/(?<!\W)i(?<!\W)/gmi, "");
            var puncHalf = str.replace(/[\w\s]/gmi, "").replace(/[\u2026\?]/gmi, "");
            var puncFull = str.replace(/[^\u2026\?]/gmi, "");
            var noXBar = str.replace(/(?<!\S)i(?!\S)/gmi, "").replace(/[^i]/gmi, "");
            return raw.length + (puncHalf.length * 0.5) + puncFull.length + (noXBar.length * 0.5);
        },
        shapeText() {
            // get text from input field
            let text = this.$el.querySelector('#input-field').value;
            let split = text.split(' ');
            let totalLen = 0;
            let extreme = 0;
            for(let i =0; i < split.length; i++) if(split[i].length > extreme) extreme = split[i].length;
            for(let i =0; i < split.length; i++) totalLen += split[i].length;
            let wordCount = split.length;
            let mean = totalLen / wordCount;
            let median = (split.length % 2 == 0) ? 0 : Math.floor(split.length / 2);
            let next = median > 0 ? median + 1 : split.length / 2;
            let prev = median > 0 ? median - 1 : split.length / 2 - 1;
            const singleMedian = (wordCount % 2) === 1 ? true : false;
            if(wordCount === 1) return array.join('');
            else if(wordCount === 2) return array.join('\r');
            else if(wordCount === 3) {
                var longestIdx = 0;
                var mediumIdx = 0;
                for(var i = 0; i < 3; i++) if(split[i].length > longestIdx) longestIdx = i;
                for(var i = 0; i < 3; i++) if(split[i].length > mediumIdx && i != longestIdx) mediumIdx = i;
                if(this.charCount(split[mediumIdx]) / longestIdx >= 0.6 || 
                longestIdx === 1) return split.join('\r');
                else if(longestIdx === 0) {
                    split[1] += " " + split[2];
                    split.splice(2, 1);
                }
                else if(longestIdx === 2) {
                    split[0] += " " + split[1];
                    split.splice(1, 1);
                }
                return split.join('\r');
            }
            var ext = (Math.pow(mean, 2) * Math.asin(wordCount / totalLen) * 2) + 1;
            var reme = (Math.sqrt(mean) / Math.sqrt(totalLen)) * 3.14;
            extreme = Math.round(ext + reme);
            for(var i = 0; i < split.length; i++) if(split[i].length > extreme) extreme = split[i].length;
            if((singleMedian) && (split[median] !== undefined)) {
                while(true) {
                    if((this.charCount(split[prev]) + this.charCount(split[median]) + this.charCount(split[next])) <= extreme) {
                        var nextLine = "";
                        var splitCopy = [ ];
                        for(var j = 0; j < split.length; j += 1) splitCopy.push(split[j]);
                        var comparator = split[next] + " " + split[next + 1];
                        if((next + 1) <= (splitCopy.length - 1)) {
                            while(true) {
                                var mockNext = next;
                                if((this.charCount(splitCopy[mockNext]) + this.charCount(splitCopy[mockNext + 1])) <= this.charCount(comparator)) {
                                    splitCopy[mockNext] += " " + splitCopy[mockNext + 1];
                                    splitCopy.splice(mockNext + 1, 1);
                                } 
                                else {
                                    nextLine = splitCopy[mockNext];
                                    break;
                                }
                            }
                        }
                        if((nextLine !== "") && (this.charCount(split[next + 1]) > (extreme * 0.25))) {
                            if(((2.75 < (this.charCount(comparator) / this.charCount(nextLine))) || 
                            ((this.charCount(comparator) / this.charCount(nextLine)) < 0.75)) || 
                            (this.charCount(nextLine) <= (this.charCount(split[prev - 1]) + 2))) {
                                break;
                            }
                        }
                        else if(this.charCount(comparator) / this.charCount(split[next + 1]) >= 4) break; 
                        nextLine = "";
                        splitCopy = [ ];
                        for(var j = 0; j < split.length; j += 1) splitCopy.push(split[j]);
                        comparator = split[prev - 1] + " " + split[prev];
                        if((prev - 1) >= 0) {
                            while(true) {
                                var mockPrev = prev;
                                var mockMedian = median;
                                var mockNext = next;
                                if((this.charCount(splitCopy[mockPrev - 1]) + this.charCount(splitCopy[mockPrev])) <= this.charCount(comparator)) {
                                    splitCopy[mockPrev - 1] += " " + splitCopy[mockPrev];
                                    splitCopy.splice(mockPrev, 1);
                                    mockMedian--;
                                    mockPrev--;
                                    mockNext--;
                                } 
                                else {
                                    nextLine = splitCopy[mockPrev];
                                    break;
                                }
                            }
                        }
                        if((nextLine !== "") && (this.charCount(split[prev - i]) > (extreme * 0.25))) {
                            if(((2.75 < (this.charCount(comparator) / this.charCount(nextLine))) || 
                            ((this.charCount(comparator) / this.charCount(nextLine)) < 0.75)) || 
                            (this.charCount(nextLine) <= (this.charCount(split[next + 1]) + 2))) {
                                break;
                            }
                        }
                        else if(this.charCount(comparator) / this.charCount(split[prev - i]) >= 4) break; 
                        split[median] += " " + split[next];
                        split.splice(next, 1);
                        split[prev] += " " + split[median];
                        split.splice(median, 1);
                        median--;
                        prev--;
                        next--;
                    } 
                    else if((((this.charCount(split[median]) + this.charCount(split[next])) <= extreme) && 
                        ((this.charCount(split[prev]) + this.charCount(split[median])) <= extreme)) && 
                        ((this.charCount(split[prev]) + this.charCount(split[prev - 1])) > extreme)) {
                        var nextLine = "";
                        var splitCopy = [ ];
                        for(var j = 0; j < split.length; j += 1) splitCopy.push(split[j]);
                        var comparator = split[prev - 1] + " " + split[prev];
                        if((prev - 2) >= 0) {
                            while(true) {
                                var mockPrev = prev;
                                var mockMedian = median;
                                var mockNext = next;
                                if((this.charCount(splitCopy[mockPrev - 1]) + this.charCount(splitCopy[mockPrev])) <= this.charCount(comparator)) {
                                    splitCopy[mockPrev - 1] += " " + splitCopy[mockPrev];
                                    splitCopy.splice(mockPrev, 1);
                                    mockMedian--;
                                    mockPrev--;
                                    mockNext--;
                                } 
                                else {
                                    nextLine = splitCopy[mockPrev];
                                    break;
                                }
                            }
                        }
                        if((nextLine !== "") && (this.charCount(split[prev - i]) > (extreme * 0.25))) {
                            if(((2.75 < (this.charCount(comparator) / this.charCount(nextLine))) || 
                            ((this.charCount(comparator) / this.charCount(nextLine)) < 0.75)) || 
                            (this.charCount(nextLine) <= (this.charCount(split[next + 1]) + 2))) {
                                break;
                            }
                        }
                        else if(this.charCount(comparator) / this.charCount(split[prev - 1]) >= 4) break; 
                        split[prev] += " " + split[median];
                        split.splice(median, 1);
                        median--;
                        prev--;
                        next--;
                    } 
                    else if((this.charCount(split[median]) + this.charCount(split[next])) <= extreme) {
                        var nextLine = "";
                        var splitCopy = [ ];
                        for(var j = 0; j < split.length; j += 1) splitCopy.push(split[j]);
                        var comparator = split[next] + " " + split[next + 1];
                        if((next + 1) <= (split.length - 1)) {
                            while(true) {
                                var mockNext = next;
                                if((this.charCount(splitCopy[mockNext]) + this.charCount(splitCopy[mockNext + 1])) <= this.charCount(comparator)) {
                                    splitCopy[mockNext] += " " + splitCopy[mockNext + 1];
                                    splitCopy.splice(mockNext + 1, 1);
                                } 
                                else {
                                    nextLine = splitCopy[mockNext];
                                    break;
                                }
                            }
                        }                 
                        if((nextLine !== "") && (this.charCount(split[next + 1]) > (extreme * 0.25))) {
                            if(((2.75 < (this.charCount(comparator) / this.charCount(nextLine))) || 
                            ((this.charCount(comparator) / this.charCount(nextLine)) < 0.75)) || 
                            (this.charCount(nextLine) <= (this.charCount(split[prev - 1]) + 2))) {
                                break;
                            }
                        }
                        else if(this.charCount(comparator) / this.charCount(split[next + 1]) >= 4) break; 
                        split[median] += " " + split[next];
                        split.splice(next, 1);
                    } 
                    else if((this.charCount(split[prev]) + this.charCount(split[median])) <= extreme) {
                        var nextLine = "";
                        var splitCopy = [ ];
                        for(var j = 0; j < split.length; j += 1) splitCopy.push(split[j]);
                        var comparator = split[prev - 1] + " " + split[prev];
                        if((prev - 2) >= 0) {
                            while(true) {
                                var mockPrev = prev;
                                var mockMedian = median;
                                var mockNext = next;
                                if((this.charCount(splitCopy[mockPrev - 1]) + this.charCount(splitCopy[mockPrev])) <= this.charCount(comparator)) {
                                    splitCopy[mockPrev - 1] += " " + splitCopy[mockPrev];
                                    splitCopy.splice(mockPrev, 1);
                                    mockMedian--;
                                    mockPrev--;
                                    mockNext--;
                                } 
                                else {
                                    nextLine = splitCopy[mockPrev];
                                    break;
                                }
                            }
                        }
                        if((nextLine !== "") && (this.charCount(split[prev - i]) > (extreme * 0.25))) {
                            if(((2.75 < (this.charCount(comparator) / this.charCount(nextLine))) || 
                            ((this.charCount(comparator) / this.charCount(nextLine)) < 0.75)) || 
                            (this.charCount(nextLine) <= (this.charCount(split[next + 1]) + 2))) {
                                break;
                            }
                        }
                        else if(this.charCount(comparator) / this.charCount(split[prev - 1]) >= 4) break; 
                        split[prev] += " " + split[median];
                        split.splice(median, 1);
                        median--;
                        prev--;
                        next--;
                    } 
                    else break;
                }
            }
            var nextCycles = split.length - next;
            for(var i = 0; i < nextCycles; i += 1) {
                var nextExtreme = singleMedian ? this.charCount(split[median]) : extreme;
                if(((next + i) - 1) > (split.length - 1)) break;
                nextExtreme = i > 0 ? this.charCount(split[(next + i) - 1]) : nextExtreme;
                if((nextExtreme + 1) < extreme) nextExtreme++;
                while(true) {
                    if(((next + i + 1) <= (split.length - 1)) && 
                    ((this.charCount(split[next + i]) + this.charCount(split[next + i + 1])) <= nextExtreme)) {
                        var nextLine = "";
                        var splitCopy = [ ];
                        for(var j = 0; j < split.length; j += 1) splitCopy.push(split[j]);
                        var comparator = split[next + i] + " " + split[next + i + 1];
                        if(((next + i + 2) <= split.length) && (i > 0)) {
                            while(true) {
                                var mockNext = next;
                                if((this.charCount(splitCopy[mockNext + i + 1]) + this.charCount(splitCopy[mockNext + i + 2])) <= this.charCount(comparator)) {
                                    splitCopy[mockNext + i + 1] += " " + splitCopy[mockNext + i + 2];
                                    splitCopy.splice(mockNext + i + 2, 1);
                                } 
                                else {
                                    nextLine = splitCopy[mockNext + i + 1];
                                    break;
                                }
                            }
                        }
                        else if(next + i + 2 > split.length) nextLine = split[-1];
                        if((nextLine !== "") && (this.charCount(split[next + 1]) > (extreme * 0.25))) {
                            if(((2.75 < (this.charCount(comparator) / this.charCount(nextLine))) || 
                            ((this.charCount(comparator) / this.charCount(nextLine)) < 0.75)) || 
                            (this.charCount(nextLine) <= (this.charCount(split[prev - i]) + 2))) {
                                break;
                            }
                        }
                        else if(this.charCount(comparator) / this.charCount(split[next + i]) >= 4) break; 
                        else if(this.charCount(nextLine) <= 1) break;
                        else if(this.charCount(nextLine) < this.charCount(comparator) * 0.5) {
                            var nextLineNext = '';
                            while(true) {
                                var mockNext = next;
                                if((this.charCount(splitCopy[mockNext + i + 2]) + this.charCount(splitCopy[mockNext + i + 3])) <= this.charCount(nextLine)) {
                                    splitCopy[mockNext + i + 2] += " " + splitCopy[mockNext + i + 3];
                                    splitCopy.splice(mockNext + i + 3, 2);
                                } 
                                else {
                                    nextLineNext = splitCopy[mockNext + i + 2];
                                    break;
                                }
                            }
                            if(this.charCount(nextLine) < this.charCount(nextLineNext) * 0.5) {
                                extreme += nextLine.length;
                                i--;
                                continue;
                            }
                        }
                        split[next + i] += " " + split[next + i + 1];
                        split.splice(next + i + 1, 1);
                    } 
                    else break;
                }
            }
            var prevCycles = split.length - prev;
            for(var i = 0; i < prevCycles; i += 1) {
                var prevExtreme = singleMedian ? this.charCount(split[median]) : extreme;
                if(((prev - i) - 1) < 0) break;
                prevExtreme = i > 0 ? this.charCount(split[(prev - i) + 1]) : prevExtreme;
                if((prevExtreme + 1) < extreme) prevExtreme++;
                while(true) {
                    if((((prev - i) - 1) >= 0) && ((this.charCount(split[prev - i]) + this.charCount(split[(prev - i) - 1])) <= prevExtreme)) {
                        var nextLine = "";
                        var splitCopy = [ ];
                        for(var j = 0; j < split.length; j += 1) splitCopy.push(split[j]);
                        var comparator = split[(prev - i) - 1] + " " + split[prev - i];
                        if((((prev - i) - 2) >= 0) && (i > 0)) {
                            while(true) {
                                var mockPrev = prev;
                                if((this.charCount(splitCopy[(mockPrev - i) - 1]) + this.charCount(splitCopy[(mockPrev - i) - 2])) <= this.charCount(comparator)) {
                                    splitCopy[(mockPrev - i) - 2] += " " + splitCopy[(mockPrev - i) - 1];
                                    splitCopy.splice((mockPrev - i) - 1, 1);
                                    mockPrev--;
                                } 
                                else {
                                    nextLine = splitCopy[(mockPrev - i) - 2];
                                    break;
                                }
                            }
                        }
                        else if(next + i + 2 > split.length) nextLine = split[-1];
                        if((nextLine !== "") && (this.charCount(split[prev - i]) > (extreme * 0.25))) {
                            if(((2.75 < (this.charCount(comparator) / this.charCount(nextLine))) || 
                            ((this.charCount(comparator) / this.charCount(nextLine)) < 0.75)) || 
                            (this.charCount(nextLine) <= (this.charCount(split[next + i]) + 2))) {
                                break;
                            }
                        }
                        else if(this.charCount(comparator) / this.charCount(split[prev - i]) >= 4) break; 
                        else if(this.charCount(nextLine) <= 1) break;
                        else if(this.charCount(nextLine) < this.charCount(comparator) * 0.5) {
                            var nextLineNext = '';
                            while(true) {
                                var mockNext = next;
                                if((this.charCount(splitCopy[(mockPrev - i) - 2]) + this.charCount(splitCopy[(mockPrev - i) - 3])) <= this.charCount(nextLine)) {
                                    splitCopy[(mockPrev - i) - 2] += " " + splitCopy[(mockPrev - i) - 3];
                                    splitCopy.splice((mockPrev - i) - 3, 2);
                                } 
                                else {
                                    nextLineNext = splitCopy[(mockPrev - i) - 2];
                                    break;
                                }
                            }
                            if(this.charCount(nextLine) < this.charCount(nextLineNext) * 0.5) {
                                extreme += nextLine.length;
                                i--;
                                continue;
                            }
                        }
                        split[(prev - i) - 1] += " " + split[prev - i];
                        split.splice(prev - i, 1);
                        median--;
                        prev--;
                        next--;
                    } 
                    else break;
                }
            }
            var lineCount = split.length;
            for(var i = 0; i < split.length; i += 1) {
                if(!split[i].startsWith(" ")) {
                    if((split[i].endsWith("\u2026")) || (split[i].endsWith("..."))) {
                        split[i] = " " + split[i];
                    }
                }
            }
            this.shapedText = split.join('\n');
        }
    },
    mounted() {
        const script = document.createElement('script');
        script.src = "//cdn.jsdelivr.net/github-cards/latest/widget.js";
        document.body.appendChild(script);
    }
}
</script>

<style scoped>
@import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css';
@import 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap';
</style>
