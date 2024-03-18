import React from "react";
import { useEffect, useState } from "react";
import { Page, Text, Document, StyleSheet } from '@react-pdf/renderer';
import axios from "axios";

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  }
});

function PDFFile(props) {
  const service = props.data.service;
  const songs = props.data.songs;
  const handleRenderResult = props.handleRenderResult;

  const [pages, setPages] = useState([]);

  useEffect(() => {
    try {
      axios
        .get('http://localhost:5555/serviceSongs/byParentId', {
          params: {
            parentId: service.id
          }
        })
        .then((response) => {
          setPages(response.data.data);
        })
        .catch((error) => {
          console.log(error.message);
          handleRenderResult('danger', 'Error generating pdf for service!');
        })
    } catch (error) {
      console.log(error.message);
      handleRenderResult('danger', 'Error generating pdf for service!');
    }
  }, [service, handleRenderResult]);

  const getLyrics = (song) => {
    for (const s of songs) {
      if (s.title === song.song && s.author === song.author) {
        return s.lyrics;
      }
    }

    return 'No lyrics found';
  };

  return (
    <Document>
      {pages.map((page, index) => {
        return (
          <Page size='A4' style={styles.body} key={'page' + index}>
            <Text style={styles.header}>
              {'Date: ' + service.date + ', Worship Leader: ' + service.worshipLeader + '\nSong: ' + page.song + ', Author: ' + page.author + ', Key: ' + page.key}
            </Text>
            <Text style={styles.text}>{getLyrics(page)}</Text>
            <Text
              style={styles.pageNumber}
              render={({ pageNumber, totalPages }) =>
                `${pageNumber} / ${totalPages}`
              }
            />
          </Page>
        )
      })}
      
    </Document>
  )
}

export default PDFFile;