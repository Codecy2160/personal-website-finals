import Masonry from 'masonry-layout';

export default {
    data() {
        return {
            photos: []
        }
    },
    mounted() {
        this.loadPhotos();
    },
    methods: {
        scrollToAbout() {
            const aboutElement = this.$el.querySelector('#about');
            const offsetTop = aboutElement.offsetTop;
            window.scrollTo({ top: offsetTop - 20, behavior: 'smooth' });
        },
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
            let text = this.$el.querySelector('#input-text').value;
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
                if(charCount(split[mediumIdx]) / longestIdx >= 0.6 || 
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
                    if((charCount(split[prev]) + charCount(split[median]) + charCount(split[next])) <= extreme) {
                        var nextLine = "";
                        var splitCopy = [ ];
                        for(var j = 0; j < split.length; j += 1) splitCopy.push(split[j]);
                        var comparator = split[next] + " " + split[next + 1];
                        if((next + 1) <= (splitCopy.length - 1)) {
                            while(true) {
                                var mockNext = next;
                                if((charCount(splitCopy[mockNext]) + charCount(splitCopy[mockNext + 1])) <= charCount(comparator)) {
                                    splitCopy[mockNext] += " " + splitCopy[mockNext + 1];
                                    splitCopy.splice(mockNext + 1, 1);
                                } 
                                else {
                                    nextLine = splitCopy[mockNext];
                                    break;
                                }
                            }
                        }
                        if((nextLine !== "") && (charCount(split[next + 1]) > (extreme * 0.25))) {
                            if(((2.75 < (charCount(comparator) / charCount(nextLine))) || 
                            ((charCount(comparator) / charCount(nextLine)) < 0.75)) || 
                            (charCount(nextLine) <= (charCount(split[prev - 1]) + 2))) {
                                break;
                            }
                        }
                        else if(charCount(comparator) / charCount(split[next + 1]) >= 4) break; 
                        nextLine = "";
                        splitCopy = [ ];
                        for(var j = 0; j < split.length; j += 1) splitCopy.push(split[j]);
                        comparator = split[prev - 1] + " " + split[prev];
                        if((prev - 1) >= 0) {
                            while(true) {
                                var mockPrev = prev;
                                var mockMedian = median;
                                var mockNext = next;
                                if((charCount(splitCopy[mockPrev - 1]) + charCount(splitCopy[mockPrev])) <= charCount(comparator)) {
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
                        if((nextLine !== "") && (charCount(split[prev - i]) > (extreme * 0.25))) {
                            if(((2.75 < (charCount(comparator) / charCount(nextLine))) || 
                            ((charCount(comparator) / charCount(nextLine)) < 0.75)) || 
                            (charCount(nextLine) <= (charCount(split[next + 1]) + 2))) {
                                break;
                            }
                        }
                        else if(charCount(comparator) / charCount(split[prev - i]) >= 4) break; 
                        split[median] += " " + split[next];
                        split.splice(next, 1);
                        split[prev] += " " + split[median];
                        split.splice(median, 1);
                        median--;
                        prev--;
                        next--;
                    } 
                    else if((((charCount(split[median]) + charCount(split[next])) <= extreme) && 
                        ((charCount(split[prev]) + charCount(split[median])) <= extreme)) && 
                        ((charCount(split[prev]) + charCount(split[prev - 1])) > extreme)) {
                        var nextLine = "";
                        var splitCopy = [ ];
                        for(var j = 0; j < split.length; j += 1) splitCopy.push(split[j]);
                        var comparator = split[prev - 1] + " " + split[prev];
                        if((prev - 2) >= 0) {
                            while(true) {
                                var mockPrev = prev;
                                var mockMedian = median;
                                var mockNext = next;
                                if((charCount(splitCopy[mockPrev - 1]) + charCount(splitCopy[mockPrev])) <= charCount(comparator)) {
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
                        if((nextLine !== "") && (charCount(split[prev - i]) > (extreme * 0.25))) {
                            if(((2.75 < (charCount(comparator) / charCount(nextLine))) || 
                            ((charCount(comparator) / charCount(nextLine)) < 0.75)) || 
                            (charCount(nextLine) <= (charCount(split[next + 1]) + 2))) {
                                break;
                            }
                        }
                        else if(charCount(comparator) / charCount(split[prev - 1]) >= 4) break; 
                        split[prev] += " " + split[median];
                        split.splice(median, 1);
                        median--;
                        prev--;
                        next--;
                    } 
                    else if((charCount(split[median]) + charCount(split[next])) <= extreme) {
                        var nextLine = "";
                        var splitCopy = [ ];
                        for(var j = 0; j < split.length; j += 1) splitCopy.push(split[j]);
                        var comparator = split[next] + " " + split[next + 1];
                        if((next + 1) <= (split.length - 1)) {
                            while(true) {
                                var mockNext = next;
                                if((charCount(splitCopy[mockNext]) + charCount(splitCopy[mockNext + 1])) <= charCount(comparator)) {
                                    splitCopy[mockNext] += " " + splitCopy[mockNext + 1];
                                    splitCopy.splice(mockNext + 1, 1);
                                } 
                                else {
                                    nextLine = splitCopy[mockNext];
                                    break;
                                }
                            }
                        }                 
                        if((nextLine !== "") && (charCount(split[next + 1]) > (extreme * 0.25))) {
                            if(((2.75 < (charCount(comparator) / charCount(nextLine))) || 
                            ((charCount(comparator) / charCount(nextLine)) < 0.75)) || 
                            (charCount(nextLine) <= (charCount(split[prev - 1]) + 2))) {
                                break;
                            }
                        }
                        else if(charCount(comparator) / charCount(split[next + 1]) >= 4) break; 
                        split[median] += " " + split[next];
                        split.splice(next, 1);
                    } 
                    else if((charCount(split[prev]) + charCount(split[median])) <= extreme) {
                        var nextLine = "";
                        var splitCopy = [ ];
                        for(var j = 0; j < split.length; j += 1) splitCopy.push(split[j]);
                        var comparator = split[prev - 1] + " " + split[prev];
                        if((prev - 2) >= 0) {
                            while(true) {
                                var mockPrev = prev;
                                var mockMedian = median;
                                var mockNext = next;
                                if((charCount(splitCopy[mockPrev - 1]) + charCount(splitCopy[mockPrev])) <= charCount(comparator)) {
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
                        if((nextLine !== "") && (charCount(split[prev - i]) > (extreme * 0.25))) {
                            if(((2.75 < (charCount(comparator) / charCount(nextLine))) || 
                            ((charCount(comparator) / charCount(nextLine)) < 0.75)) || 
                            (charCount(nextLine) <= (charCount(split[next + 1]) + 2))) {
                                break;
                            }
                        }
                        else if(charCount(comparator) / charCount(split[prev - 1]) >= 4) break; 
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
                var nextExtreme = singleMedian ? charCount(split[median]) : extreme;
                if(((next + i) - 1) > (split.length - 1)) break;
                nextExtreme = i > 0 ? charCount(split[(next + i) - 1]) : nextExtreme;
                if((nextExtreme + 1) < extreme) nextExtreme++;
                while(true) {
                    if(((next + i + 1) <= (split.length - 1)) && 
                    ((charCount(split[next + i]) + charCount(split[next + i + 1])) <= nextExtreme)) {
                        var nextLine = "";
                        var splitCopy = [ ];
                        for(var j = 0; j < split.length; j += 1) splitCopy.push(split[j]);
                        var comparator = split[next + i] + " " + split[next + i + 1];
                        if(((next + i + 2) <= split.length) && (i > 0)) {
                            while(true) {
                                var mockNext = next;
                                if((charCount(splitCopy[mockNext + i + 1]) + charCount(splitCopy[mockNext + i + 2])) <= charCount(comparator)) {
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
                        if((nextLine !== "") && (charCount(split[next + 1]) > (extreme * 0.25))) {
                            if(((2.75 < (charCount(comparator) / charCount(nextLine))) || 
                            ((charCount(comparator) / charCount(nextLine)) < 0.75)) || 
                            (charCount(nextLine) <= (charCount(split[prev - i]) + 2))) {
                                break;
                            }
                        }
                        else if(charCount(comparator) / charCount(split[next + i]) >= 4) break; 
                        else if(charCount(nextLine) <= 1) break;
                        else if(charCount(nextLine) < charCount(comparator) * 0.5) {
                            var nextLineNext = '';
                            while(true) {
                                var mockNext = next;
                                if((charCount(splitCopy[mockNext + i + 2]) + charCount(splitCopy[mockNext + i + 3])) <= charCount(nextLine)) {
                                    splitCopy[mockNext + i + 2] += " " + splitCopy[mockNext + i + 3];
                                    splitCopy.splice(mockNext + i + 3, 2);
                                } 
                                else {
                                    nextLineNext = splitCopy[mockNext + i + 2];
                                    break;
                                }
                            }
                            if(charCount(nextLine) < charCount(nextLineNext) * 0.5) {
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
                var prevExtreme = singleMedian ? charCount(split[median]) : extreme;
                if(((prev - i) - 1) < 0) break;
                prevExtreme = i > 0 ? charCount(split[(prev - i) + 1]) : prevExtreme;
                if((prevExtreme + 1) < extreme) prevExtreme++;
                while(true) {
                    if((((prev - i) - 1) >= 0) && ((charCount(split[prev - i]) + charCount(split[(prev - i) - 1])) <= prevExtreme)) {
                        var nextLine = "";
                        var splitCopy = [ ];
                        for(var j = 0; j < split.length; j += 1) splitCopy.push(split[j]);
                        var comparator = split[(prev - i) - 1] + " " + split[prev - i];
                        if((((prev - i) - 2) >= 0) && (i > 0)) {
                            while(true) {
                                var mockPrev = prev;
                                if((charCount(splitCopy[(mockPrev - i) - 1]) + charCount(splitCopy[(mockPrev - i) - 2])) <= charCount(comparator)) {
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
                        if((nextLine !== "") && (charCount(split[prev - i]) > (extreme * 0.25))) {
                            if(((2.75 < (charCount(comparator) / charCount(nextLine))) || 
                            ((charCount(comparator) / charCount(nextLine)) < 0.75)) || 
                            (charCount(nextLine) <= (charCount(split[next + i]) + 2))) {
                                break;
                            }
                        }
                        else if(charCount(comparator) / charCount(split[prev - i]) >= 4) break; 
                        else if(charCount(nextLine) <= 1) break;
                        else if(charCount(nextLine) < charCount(comparator) * 0.5) {
                            var nextLineNext = '';
                            while(true) {
                                var mockNext = next;
                                if((charCount(splitCopy[(mockPrev - i) - 2]) + charCount(splitCopy[(mockPrev - i) - 3])) <= charCount(nextLine)) {
                                    splitCopy[(mockPrev - i) - 2] += " " + splitCopy[(mockPrev - i) - 3];
                                    splitCopy.splice((mockPrev - i) - 3, 2);
                                } 
                                else {
                                    nextLineNext = splitCopy[(mockPrev - i) - 2];
                                    break;
                                }
                            }
                            if(charCount(nextLine) < charCount(nextLineNext) * 0.5) {
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
            return this.$el.querySelector('#output-text').value = split.join('\r');
        },
        loadPhotos() {
            fetch('https://api.github.com/repos/codecy2160/codecy/contents/source/portfolio')
                .then(response => response.json())
                .then(data => {
                    const photos = data.filter(file => file.name.endsWith('.jpg'));
                    this.photos = photos.map(photo => ({
                        url: `https://raw.githubusercontent.com/codecy2160/codecy/main/source/portfolio/${photo.name}`,
                        name: photo.name
                    }));
                    this.initMasonry();
                })
                .catch(error => console.error(error));
        },
        initMasonry() {
            const masonryGallery = this.$refs.masonryGallery;
            const masonry = new Masonry(masonryGallery, {
                itemSelector: '.masonry-item',
                columnWidth: '.grid-sizer',
                gutter: '.gutter-sizer',
                percentPosition: true,
            });
        }
    }
}

